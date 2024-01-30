import appwriteSDK from "@/services/AppConfigServer";
import { DB } from "@/utils/constans";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { IColumnFromDB, IColumnRequestBody } from "@/utils/types";
import { makeColumn, makeErrorResponse, setToken } from "@/api/DBFunctions";

export async function GET() {
    try {
        setToken();

        // Get all columns
        const columns = await appwriteSDK.databases.listDocuments(
            DB.id,
            DB.collections.COLUMNS_ID
        );

        return NextResponse.json(columns);
    } catch (error) {
        return makeErrorResponse(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        setToken();

        const newColumn = await request.json() as IColumnRequestBody;

        // Get columns by boardId
        const columns = await appwriteSDK.databases.listDocuments(
            DB.id,
            DB.collections.COLUMNS_ID,
            [
                Query.equal("boardId", newColumn.boardId)
            ]
        );

        // Set index and save the new column
        const columnWithIndex = { ...newColumn, index: columns.documents.length + 1 };
        const createdColumn = await appwriteSDK.databases.createDocument(
            DB.id,
            DB.collections.COLUMNS_ID,
            ID.unique(),
            columnWithIndex
        );

        return NextResponse.json(makeColumn(createdColumn as IColumnFromDB));
    } catch (error) {
        return makeErrorResponse(error);
    }
}
