/** @format */

import { DialogProps } from "@radix-ui/react-dialog";
import { AppwriteException, Models } from "appwrite";
import { PropsWithChildren } from "react";
import { AuthProviders } from "./constans";
import { IBoard } from "@/utils/types/boardTypes";

// Helper Types
export type ValueOf<T> = T[keyof T];

// Models
export type IUser = Models.User<Models.Preferences>;

// Task
export interface ITaskMoveDetails {
    targetColumnId: IColumn["$id"];
    currentColumnId: IColumn["$id"];
    targetTaskIndex: number;
    taskId: ITask["$id"];
}

export interface IColumnMoveDetails {
    currentBoardId: IBoard["$id"];
    targetColumnIndex: number;
    columnId: IColumn["$id"];
}


// Task
export interface ITask extends Models.Document {
    title: string;
    index: number;
    column: IColumn;
    description?: string;
    columnId: IColumn["$id"];
}

export interface ITaskRequestBody extends Models.Document {
    title: string;
    description?: string;
    columnId: IColumn["$id"];
}

export interface IColumnRequestBody extends Models.Document {
    title: string;
    boardId: IColumn["$id"];
}

export interface ITaskFromDB extends Models.Document {
    title: string;
    index: number;
    description?: string | null;
    columnId: IColumn["$id"];
}

export interface IColumn extends Models.Document {
    title: string;
    index: number;
    tasks: ITask[];
    board: IBoard;
    boardId: IBoard["$id"];
}

export interface IColumnFromDB extends Models.Document {
    title: string;
    index: number;
    tasks: ITaskFromDB[];
    boardId: IBoard;
}

// Api
export interface IResponse<T> {
    document: T;
}

export interface IListResponse<T> {
    total: number;
    documents: T[];
}

// Column
export interface IColumnResponse extends IResponse<IColumn> {
}

export interface IColumnListResponse extends IListResponse<IColumn> {
}

export interface ITaskResponse extends IResponse<ITask> {
}

export interface ITaskListResponse extends IListResponse<ITask> {
}


// Auth
export type AuthProvierValues = ValueOf<typeof AuthProviders>;

export interface ISignInPayload {
    email: string;
    password: string;
}

export interface ISignUpPayload {
    email: string;
    password: string;
    name?: string;
    userId?: string;
}

// Modals
export interface ModalBaseProps extends PropsWithChildren, DialogProps {
    buttonTitle?: string;
    description?: string;
    title?: string;
    onSubmit?: (a: any) => void;
}

// Others
export interface IErrorResponse {
    message: string;
    code: number;
    type: string;
    version: string;
}

export interface IOmitDocument extends Omit<Document, keyof Document> {
}


// export interface IUser extends Models.Document {
//     name: string;
//     scores: [];
//     statusId: string;
// }
//
// export type IUserWithout = Omit<IUser, "statusId">
//
// const test: IUserWithout = {  };

export interface IPrimaryError {
    code: number;
    type: string;
    message: string;
    version: string;
}