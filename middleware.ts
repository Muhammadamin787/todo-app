import { NextRequest, NextResponse } from "next/server";
import { Responses } from "@/api/Responses";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const jwt = cookies().get("jwt");
    if (!jwt) return Responses.NotAuthorized;
    return NextResponse.next();
}

export const config = {
    matcher: "/api/board"
};
