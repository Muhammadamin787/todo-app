"use client";
import { IColumn } from "@/utils/types";
import { useDispatch } from "lib/redux";
import { useEffect, useState } from "react";
import {
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useLazyFetchTasksByColumnIdQuery,
    useMoveTaskMutation,
    useUpdateTaskMutation
} from "@/services/apiService";

interface IConfig {
    fetchOnMount?: boolean;
    columnId?: IColumn["$id"];
}

export default function useTasks(config?: IConfig) {
    // Parameters
    const { fetchOnMount = false, columnId = "" } = config || {};

    // Helper Hooks
    const dispatch = useDispatch();

    // Selectors
    // const tasks = useSelector((state) => selectTaskByColumnId(state,columnId));
    // const tasks = useSelector((state) => state.taskSlice.tasks[columnId]) || [];

    // console.table({
    //     [columnId]: tasks
    // });
    // States
    const [error, setError] = useState("");
    const [isGlobalLoading, setGlobalLoading] = useState(false);

    // GET
    const [fetchTasks, getResponse] = useLazyFetchTasksByColumnIdQuery();
    const { data: fetchData, isLoading: isFetching, isSuccess } = getResponse;
    const { documents: tasks = [] } = fetchData || {};

    // CREATE
    const [createTask, createResponse] = useCreateTaskMutation();
    const { data, isLoading: isCreating } = createResponse;

    // UPDATE
    const [updateTask, updateResponse] = useUpdateTaskMutation();
    const { isLoading: isUpdating } = updateResponse;

    // MOVE
    const [moveTask, moveResponse] = useMoveTaskMutation();
    const { isLoading: isMoving } = moveResponse;

    // DELETE
    const [deleteTask, deleteResponse] = useDeleteTaskMutation();
    const { isLoading: isDeleting } = deleteResponse;

    // Effects
    useEffect(() => {
        if (fetchOnMount && columnId) fetchTasks(columnId);
    }, []);

    return {
        // Functions
        fetchTasks,
        createTask,
        updateTask,
        moveTask,
        deleteTask,

        // Data
        tasks,
        error,

        // State
        isGlobalLoading,
        isCreating,
        isMoving,
        isUpdating,
        isFetching,
        isDeleting
    };
}
