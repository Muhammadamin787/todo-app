import appwriteSDK from "@/services/AppConfigServer";
import { DB } from "@/utils/constans";
import { IColumn, IColumnMoveDetails } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException, Query } from "node-appwrite";
import { makeErrorResponse, setToken } from "@/api/DBFunctions";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const newColumn = (await request.json()) as IColumn;
        const updatedColumn = await appwriteSDK.databases.updateDocument(
            DB.id,
            DB.collections.COLUMNS_ID,
            newColumn.$id,
            newColumn
        );
        return NextResponse.json({ document: updatedColumn });
    } catch (error) {
        return makeErrorResponse(error)
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        setToken();

        const { targetColumnIndex, currentBoardId } = await request.json() as IColumnMoveDetails;
        const targetIndex = targetColumnIndex === 0 ? 1 : targetColumnIndex;

        // Get columns by boardId
        const columns = await appwriteSDK.databases.listDocuments<IColumn>(
            DB.id,
            DB.collections.COLUMNS_ID,
            [
                Query.equal("boardId", currentBoardId)
            ]
        );

        // Find the column
        const column = columns.documents.find(col => col.$id === params.id);
        if (!column) return NextResponse.json({ error: "Column not found in the board!" }, { status: 500 });

        // Sort columns, exclude current column
        const sortedColumns = columns.documents
            .sort((a, b) => a.index - b.index)
            .filter(t => t.$id !== params.id);

        // Place the column to target location
        sortedColumns.splice(targetIndex - 1, 0, column);

        // Make update column promises
        const promises = sortedColumns.map((col, index) => {
            return appwriteSDK.databases.updateDocument(
                DB.id,
                DB.collections.COLUMNS_ID,
                col.$id,
                { index: index + 1 }
            );
        });

        await Promise.all(promises)
            .then()
            .catch((e) => {
                const error = e as AppwriteException;
                return NextResponse.json({ error }, { status: error.code || 500 });
            });

        return NextResponse.json({ success: "Moved" });
    } catch (error) {
        return makeErrorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        setToken();

        // Delete the column
        await appwriteSDK.databases.deleteDocument(
            DB.id,
            DB.collections.COLUMNS_ID,
            params.id
        );

        return NextResponse.json({ deleted: true });
    } catch (error) {
        return makeErrorResponse(error)
    }
}
