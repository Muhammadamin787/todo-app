import { createApi } from "@reduxjs/toolkit/query/react";
import type { IColumn, ITask, ITaskResponse, ITaskListResponse, ITaskMoveDetails } from "@/utils/types";
import { toast } from "@/components/shadcn/ui";
// import { columnsApi } from "@/services/apiService/columnsApi";
import { ReduxState } from "lib/redux";
import { BaseQueryWithAuth } from "lib/redux/jwtMiddleware";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: BaseQueryWithAuth,
    tagTypes: ["taskListData"],
    endpoints: (build) => ({

        createTask: build.mutation<ITask, Partial<ITask>>({
            query: (body) => ({
                url: "/api/task",
                method: "POST",
                body
            }),
            onQueryStarted(_, { queryFulfilled, dispatch, getState }) {
                const store = getState() as ReduxState;
                const boardId = store.boardSlice.currentBoardId!;

                // Pessimistic update
                queryFulfilled.then(({ data: task }) => {
                    // dispatch(columnsApi.util?.updateQueryData("fetchColumnsByBoardId", boardId,
                    //     (draft) => {
                    //         const column = draft.find(col => col.$id === task.columnId);
                    //         if (column) column.tasks.push(task);
                    //     }
                    // ));
                });
            }
        }),

        updateTask: build.mutation<ITask, Partial<ITask>>({
            query: ({ id, ...body }) => ({
                url: `/api/task/${id}`,
                method: "PUT",
                body
            })
        }),

        fetchTasksByColumnId: build.query<ITaskListResponse, IColumn["$id"]>({
            query: (columnId) => `/api/task/byColumnId/${columnId}`,
            providesTags: (column, _, columnId) => {
                if (!column) return [{ type: "taskListData", id: "taskList" }];
                return [{ type: "taskListData", id: columnId }];
            }
        }),

        moveTask: build.mutation<ITask, ITaskMoveDetails>({
            query: (body) => ({
                url: `/api/task/${body.taskId}`,
                method: "PATCH",
                body
            }),
            transformResponse: (data: ITaskResponse) => data.document,
            onQueryStarted(
                taskDetails: ITaskMoveDetails,
                { dispatch, queryFulfilled, getState }
            ) {

                const {
                    targetTaskIndex,
                    taskId,
                    targetColumnId,
                    currentColumnId
                } = taskDetails;
                const isSameColumn = currentColumnId === targetColumnId;

                const store = getState() as ReduxState;
                const boardId = store.boardSlice.currentBoardId!;


                // Pessimistic update
                if (isSameColumn) {
                    // const moveOperation = dispatch(columnsApi.util?.updateQueryData("fetchColumnsByBoardId", boardId,
                    //     (draft) => {
                    //         const column = draft.find(col => col.$id === currentColumnId);
                    //         if (column) {
                    //             const theTask = column.tasks.find(task => task.$id === taskId)!;
                    //             column.tasks.splice(theTask.index - 1, 1);
                    //             column.tasks.splice(targetTaskIndex, 0, theTask);
                    //             column.tasks = column.tasks.map((task, index) => ({ ...task, index: index + 1 }));
                    //         }
                    //     }
                    // ));

                    queryFulfilled.catch(() => {
                        // moveOperation.undo();
                        toast({ title: "Error on moving", variant: "destructive" });
                    });
                } else {
                    try {
                        // @ts-ignore
                        const columnsCache = columnsApi.endpoints?.fetchColumnsByBoardId.select(boardId)(getState());
                        const currentColumn = (columnsCache.data as IColumn[]).find(col => col.$id === currentColumnId);
                        const currentTask = currentColumn && currentColumn.tasks.find(task => task.$id === taskId);

                        if (!currentTask) {
                            toast({ title: "Task is not found" });
                            return;
                        }

                        // const addOperation = dispatch(columnsApi.util?.updateQueryData("fetchColumnsByBoardId", boardId,
                        //     (draft) => {
                        //         const column = draft.find(col => col.$id === targetColumnId);
                        //
                        //         if (column) {
                        //             column.tasks.splice(targetTaskIndex, 0, currentTask!);
                        //             column.tasks = column.tasks.map((task, index) => ({ ...task, index: index + 1 }));
                        //         }
                        //     }
                        // ));

                        // const removeOperation = dispatch(columnsApi.util?.updateQueryData("fetchColumnsByBoardId", boardId,
                        //     (draft) => {
                        //         const column = draft.find(col => col.$id === currentColumnId);
                        //         if (column) {
                        //             const removedTask = column.tasks.find(task => task.$id === taskId)!;
                        //             column.tasks.splice(removedTask.index - 1, 1);
                        //             column.tasks = column.tasks.map((task, index) => ({ ...task, index: index + 1 }));
                        //         }
                        //     }
                        // ));


                        queryFulfilled.catch(() => {
                            // addOperation.undo();
                            // removeOperation.undo();
                            toast({ title: "Error on moving", variant: "destructive" });
                        });
                    } catch (e) {
                        console.log(e);
                    }

                }
            }
        }),

        deleteTask: build.mutation<{ deleted: boolean }, { taskId: ITask["$id"], columnId: IColumn["$id"] }>({
            query: (args) => ({
                url: `/api/task/${args.taskId}`,
                method: "DELETE"
            }),
            onQueryStarted(args, { queryFulfilled, dispatch, getState }) {
                const store = getState() as ReduxState;
                const boardId = store.boardSlice.currentBoardId!;

                // Pessimistic update
                queryFulfilled.then(() => {
                    // dispatch(columnsApi.util?.updateQueryData("fetchColumnsByBoardId", boardId,
                    //     (draft) => {
                    //         const column = draft.find(col => col.$id === args.columnId);
                    //         if (column) column.tasks = column.tasks.filter(task => task.$id !== args.taskId);
                    //     }
                    // ));
                });
            }
        })
    })
});

export const {
    useCreateTaskMutation,
    useMoveTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useLazyFetchTasksByColumnIdQuery
} = tasksApi;
