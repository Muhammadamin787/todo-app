import type { IDocumentListResponse, IDocumentResponse } from "@/utils/types/httpTypes";
import { Models } from "appwrite";

// MODELS
export interface IBoard extends Models.Document {
    title: string;
}

// API
export interface IBoardResponse extends IDocumentResponse<IBoard> {
}

export interface IBoardListResponse extends IDocumentListResponse<IBoard> {
}