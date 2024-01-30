import appwriteSDK from "@/services/AppConfigServer";
import { DB } from "@/utils/constans";
import { ITask, ITaskMoveDetails } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";
import { makeErrorResponse, reIndexTasks, setToken } from "@/api/DBFunctions";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        setToken();

        const newTask = await request.json() as Partial<ITask>;

        // Update the task
        const updatedTask = await appwriteSDK.databases.updateDocument(
            DB.id,
            DB.collections.TASKS_ID,
            params.id,
            newTask
        );
        return NextResponse.json(updatedTask);
    } catch (error) {
        return makeErrorResponse(error);
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {

    try {
        const { targetColumnId, targetTaskIndex: tt, currentColumnId } = await request.json() as ITaskMoveDetails;
        const isSameColumn = targetColumnId === currentColumnId;
        const targetTaskIndex = tt;

        // Update current Task
        const movedTask = await appwriteSDK.databases.updateDocument(
            DB.id,
            DB.collections.TASKS_ID,
            params.id,
            { columnId: targetColumnId, index: targetTaskIndex + 1 || 1 }
        ) as ITask;

        // Re-index target column tasks
        await reIndexTasks(currentColumnId, movedTask, targetTaskIndex)
            .then()
            .catch((e) => {
                const error = e as AppwriteException;
                return NextResponse.json({ error }, { status: error.code || 500 });
            });

        // Re-index current column tasks
        // If task is moved within the same column, we needn't to re-index 2 times, since we are doing the below
        if (!isSameColumn) {
            await reIndexTasks(targetColumnId, movedTask, targetTaskIndex)
                .then()
                .catch((e) => {
                    const error = e as AppwriteException;
                    return NextResponse.json({ error }, { status: error.code || 500 });
                });
        }


        return NextResponse.json({ document: {} });
    } catch (error) {
        return makeErrorResponse(error);
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        setToken();

        // Delete the task
        await appwriteSDK.databases.deleteDocument(
            DB.id,
            DB.collections.TASKS_ID,
            params.id
        );

        return NextResponse.json({ deleted: true });
    } catch (error) {
        return makeErrorResponse(error);
    }
}

function sortByIndex(a: ITask, b: ITask) {
    return a.index - b.index ? 1 : -1;
}


function makeUpdatePromise(taskId: ITask["$id"], body: Partial<ITask>) {
    return appwriteSDK.databases.updateDocument(
        DB.id,
        DB.collections.TASKS_ID,
        taskId,
        body
    );
}
