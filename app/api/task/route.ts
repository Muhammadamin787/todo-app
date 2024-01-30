import type { ITaskFromDB, ITaskRequestBody } from "@/utils/types";
import appwriteSDK from "@/services/AppConfigServer";
import { NextRequest, NextResponse } from "next/server";
import { makeErrorResponse, makeTask, setToken } from "@/api/DBFunctions";
import { ID, Query } from "node-appwrite";
import { DB } from "@/utils/constans";

// export async function GET() {
//     try {
//         setToken();
//
//         // Get all tasks
//         const tasks = await appwriteSDK.databases.listDocuments(
//             DB.id,
//             DB.collections.TASKS_ID
//         );
//         return NextResponse.json(tasks);
//     } catch (error) {
//         return NextResponse.json({ error });
//     }
// }

export async function POST(request: NextRequest) {
    try {
        setToken();

        const newTask = await request.json() as ITaskRequestBody;

        // Get tasks by columnId
        const tasks = await appwriteSDK.databases.listDocuments(
            DB.id,
            DB.collections.TASKS_ID,
            [Query.equal("columnId", newTask.columnId)]
        );

        // Set index and save the new task
        const indexedTask = { ...newTask, index: tasks.documents.length + 1 };
        const createdTask = await appwriteSDK.databases.createDocument(
            DB.id,
            DB.collections.TASKS_ID,
            ID.unique(),
            indexedTask
        ) as ITaskFromDB;

        return NextResponse.json(makeTask(createdTask, newTask.columnId));
    } catch (error) {
        return makeErrorResponse(error);
    }
}
