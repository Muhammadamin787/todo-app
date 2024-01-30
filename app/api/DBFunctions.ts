import appwriteSDK from "@/services/AppConfigServer";
import { IColumn, IColumnFromDB, ITask, ITaskFromDB } from "@/utils/types";
import { DB } from "@/utils/constans";
import { cookies } from "next/headers";
import { AppwriteException } from "node-appwrite";
import { NextResponse } from "next/server";


export function setToken() {
    const jwt = cookies().get("jwt")!;
    appwriteSDK.client.setJWT(jwt.value);
}
export async function reIndexTasks(columnId: IColumn["$id"], movedTask: ITask, targetIndex: number) {

    // Get tasks by column
    const column = await appwriteSDK.databases.getDocument<IColumn>(
        DB.id,
        DB.collections.COLUMNS_ID,
        columnId
    );

    // Sort tasks
    const sortedTasks = column.tasks.sort(sortByIndex).filter(t => t.$id !== movedTask.$id);
    sortedTasks.splice(targetIndex, 0, movedTask);

    // Make update task promises
    const promises = sortedTasks.map((task, index) => {
        return makeUpdatePromise(task.$id, { index: index + 1 });
    });

    return Promise.all(promises);
}

export function makeUpdatePromise(taskId: ITask["$id"], body: Partial<ITask>) {
    return appwriteSDK.databases.updateDocument(
        DB.id,
        DB.collections.TASKS_ID,
        taskId,
        body
    );
}

export function sortByIndex(a: ITask | ITaskFromDB, b: ITask | ITaskFromDB) {
    return a.index - b.index;
}

export function makeTask(task: ITaskFromDB, columnId: IColumn["$id"]) {
    return {
        ...task,
        columnId
    };
}

export function makeColumn(column: IColumnFromDB) {
    return {
        ...column,
        tasks: column.tasks.sort(sortByIndex).map(task => makeTask(task, column.$id)),
        board: column.boardId,
        boardId: column.boardId.$id
    };
}

export function makeErrorResponse(error: unknown) {
    if (error instanceof AppwriteException) {
        return NextResponse.json(error.response, { status: error.code || undefined });
    }
    return NextResponse.json(error, { status: 500 });
}

