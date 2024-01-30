import { NextResponse } from "next/server";

export const Responses = Object.freeze({
    NotAuthorized: NextResponse.json({ error: "Unauthorized",type:"jwt_error" }, { status: 401 })
});
