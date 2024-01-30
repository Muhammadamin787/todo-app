import appwriteSDK from "@/services/AppConfigServer";
import { DB } from "@/utils/constans";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException, ID, Permission, Role } from "node-appwrite";
import { cookies, headers } from "next/headers";
import { setToken } from "@/api/DBFunctions";

export async function GET() {
    try {
        setToken()

        // Get boards by userId
        const boards = await appwriteSDK.databases.listDocuments(
            DB.id,
            DB.collections.BOARDS_ID
        );

        return NextResponse.json(boards);
    } catch (error) {
        if (error instanceof AppwriteException) {
            return NextResponse.json({ error }, { status: error.code || 500 });
        }
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        setToken();
        const board = await request.json();
        const userId = headers().get("x-user-id")!;

        const saved = await appwriteSDK.databases.createDocument(
            DB.id,
            DB.collections.BOARDS_ID,
            ID.unique(),
            board,
            [
                Permission.read(Role.user(userId)),
                Permission.write(Role.user(userId)),
                Permission.delete(Role.user(userId)),
                Permission.update(Role.user(userId))
            ]
        );

        return NextResponse.json(saved);
    } catch (error) {
        return NextResponse.json({ error });
    }
}