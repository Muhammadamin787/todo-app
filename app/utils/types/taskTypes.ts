import type { IColumn } from "@/utils/types";
import type { IDocumentListResponse, IDocumentResponse } from "@/utils/types/httpTypes";
import { Models } from "appwrite";

// MODELS
export interface ITaskNew extends Models.Document {
    title: string;
    index: number;
    description: string;
    columnId: IColumn["$id"];
}

// API
export interface ITaskResponse extends IDocumentResponse<ITaskNew> {
}

export interface ITaskListResponse extends IDocumentListResponse<ITaskNew> {
}