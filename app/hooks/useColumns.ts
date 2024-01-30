"use client";
import { useEffect, useState } from "react";
import { IBoard } from "@/utils/types/boardTypes";
import {
    useCreateColumnMutation,
    useDeleteColumnMutation,
    useLazyFetchColumnsByBoardIdQuery,
    useMoveColumnMutation,
    useUpdateColumnMutation
} from "@/services/apiService/columnsApi";

interface IConfig {
    fetchOnMount?: boolean;
    boardId?: IBoard["$id"];
}

export default function useColumns(config?: IConfig) {
    // Parameters
    const { fetchOnMount = false, boardId = "" } = config || {};

    // States
    const [error, setError] = useState("");
    const [isGlobalLoading, setGlobalLoading] = useState(false);

    // GET
    const [fetchColumns, getResponse] = useLazyFetchColumnsByBoardIdQuery();
    const { data: columns = [], isLoading: isFetching, isSuccess } = getResponse;

    // CREATE
    const [createColumn, createResponse] = useCreateColumnMutation();
    const { data: column, isLoading: isCreating } = createResponse;

    // UPDATE
    const [updateColumn, updateResponse] = useUpdateColumnMutation();
    const { isLoading: isUpdating } = updateResponse;

    // UPDATE
    const [moveColumn, moveResponse] = useMoveColumnMutation();
    const { isLoading: isMoving } = moveResponse;

    // DELETE
    const [deleteColumn, deleteResponse] = useDeleteColumnMutation();
    const { isLoading: isDeleting } = deleteResponse;

    // Effects
    useEffect(() => {
        if (fetchOnMount && boardId) fetchColumns(boardId);
    }, []);

    return {
        // Functions
        fetchColumns,
        createColumn,
        updateColumn,
        deleteColumn,
        moveColumn,

        // Data
        columns,
        error,

        // State
        // loading, // This is a global loading of one column
        isGlobalLoading,
        isCreating,
        isFetching,
        isDeleting
    };
}
