import appwriteSDK from "@/services/AppConfigServer";
import { DB } from "@/utils/constans";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { makeErrorResponse, setToken } from "@/api/DBFunctions";

// export async function GET() {
//     try {
//         const userId = headers().get("x-user-id")!;
//
//         const boards = await appwriteSDK.databases.listDocuments(
//             DB.id,
//             DB.collections.BOARDS_ID
//             // [
//             //     Query.equal("userId", userId)
//             // ]
//         );
//
//         return NextResponse.json(boards);
//     } catch (error) {
//         return NextResponse.json({ error });
//     }
// }


export function PUT() {

}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        setToken();

        const deleted = await appwriteSDK.databases.deleteDocument(
            DB.id,
            DB.collections.BOARDS_ID,
            params.id
        );

        return NextResponse.json(deleted);
    } catch (error) {
        await makeErrorResponse();
    }
}