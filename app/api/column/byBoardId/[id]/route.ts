import appwriteSDK from "@/services/AppConfigServer";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException, Query } from "node-appwrite";
import { DB } from "@/utils/constans";
import { IColumn, IColumnFromDB } from "@/utils/types";
import { makeColumn, setToken } from "@/api/DBFunctions";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        setToken();

        // Get columns by boardId, order ASC
        const columns = await appwriteSDK.databases.listDocuments(
            DB.id,
            DB.collections.COLUMNS_ID,
            [
                Query.equal("boardId", params.id),
                Query.orderAsc("index")
            ]
        ) as { documents: IColumnFromDB[] };

        return NextResponse.json(columns.documents.map(makeColumn));
    } catch (err) {
        const error = err as AppwriteException;
        return NextResponse.json({ error }, { status: error.code || 500 });
    }
}