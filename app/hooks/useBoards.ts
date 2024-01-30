"use client";
import { useEffect, useState } from "react";
import type { IBoard } from "@/utils/types/boardTypes";
import {
    useCreateBoardMutation,
    useDeleteBoardMutation,
    useLazyFetchBoardsQuery,
    useUpdateBoardMutation
} from "@/services/apiService";

interface IConfig {
    fetchOnMount?: boolean;
}

const initialBoards = [{}, {}, {}] as IBoard[];

export default function useBoards(config?: IConfig) {

    // Parameters
    const { fetchOnMount = false } = config || {};

    // Helper Hooks
    // const dispatch = useDispatch();

    // Selectors
    // const { loading } = useSelector((state) => state.boardSlice);

    // States
    const [error, setError] = useState("");
    const [isGlobalLoading, setGlobalLoading] = useState(false);

    // GET
    const [fetchBoards, getResponse] = useLazyFetchBoardsQuery();
    const { data: fetchedData, isLoading: isFetching, isSuccess } = getResponse;
    const { documents: boards = [] } = fetchedData || {};

    // CREATE
    const [createBoard, createResponse] = useCreateBoardMutation();
    const { data: board, isLoading: isCreating } = createResponse;

    // UPDATE
    const [updateBoard, updateResponse] = useUpdateBoardMutation();
    const { isLoading: isUpdating } = updateResponse;

    // DELETE
    const [deleteBoard, deleteResponse] = useDeleteBoardMutation();
    const { isLoading: isDeleting } = deleteResponse;

    // Effects
    useEffect(() => {
        if (fetchOnMount) fetchBoards();
        try {
        } catch (e) {
            console.log(e);
        }
    }, []);

    return {
        // Functions
        fetchBoards,
        createBoard,
        updateBoard,
        deleteBoard,

        // Data
        boards,
        error,

        // State
        isGlobalLoading,
        isFetching,
        isCreating,
        isDeleting
    };
}
