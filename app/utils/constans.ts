/** @format */

import { cn } from "lib/utils";

// Auth
export const AuthProviders = Object.freeze({
    GOOGLE: "google",
    GITHUB: "github"
} as const);


// Database
export const DB = Object.freeze({
    id: String(process.env.DB_ID),
    collections: {
        BOARDS_ID: String(process.env.BOARDS_ID),
        COLUMNS_ID: String(process.env.COLUMNS_ID),
        TASKS_ID: String(process.env.TASKS_ID)
    }
});


// Api Routes
export const BASE_URL = "http://localhost:3000" as const;
export const pageURLs = Object.freeze({
    main: "/",
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in"
} as const);


// Toast
export const ToastTopStyle = cn(
    "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
);


// Others
export const dragItemTypes = Object.freeze({
    COLUMN: "type-column",
    TASK: "type-task"
} as const);