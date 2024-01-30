import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQueryWithAuth } from "lib/redux/jwtMiddleware";
import { IColumn, IColumnListResponse, IColumnMoveDetails, IColumnResponse } from "@/utils/types";
import { IBoard } from "@/utils/types/boardTypes";
import { toast } from "@/components/shadcn/ui";

export const columnsApi = createApi({
    reducerPath: "columnsApi",
    baseQuery: BaseQueryWithAuth,
    tagTypes: ["columnListData"],
    endpoints: (build) => ({
        fetchColumns: build.query<IColumn[], void>({
            query: () => "/api/column",
            providesTags: ["columnListData"],
            transformResponse: (data: IColumnListResponse) => data.documents
        }),

        fetchColumnsByBoardId: build.query<IColumn[], IBoard["$id"]>({
            query: (boardId) => `/api/column/byBoardId/${boardId}`,
            providesTags: ["columnListData"]
        }),

        createColumn: build.mutation<IColumn, Partial<IColumn>>({
            query: (body) => ({
                url: "/api/column",
                method: "POST",
                body
            }),
            onQueryStarted(_, { queryFulfilled, dispatch }) {

                // Pessimistic update
                queryFulfilled.then(({ data: column }) => {
                    dispatch(columnsApi.util?.updateQueryData("fetchColumnsByBoardId", column.boardId,
                        (draft) => {
                            draft.push(column);
                        }
                    ));
                });
            }
        }),

        updateColumn: build.mutation<IColumn, Partial<IColumn>>({
            query: (body) => ({
                url: `/api/column/${body.$id}`,
                method: "PUT",
                body
            }),
            transformResponse: (data: IColumnResponse) => data.document
        }),

        moveColumn: build.mutation<IColumn, IColumnMoveDetails>({
            query: (body) => ({
                url: `/api/column/${body.columnId}`,
                method: "PATCH",
                body
            }),
            onQueryStarted(
                columnDetails: IColumnMoveDetails,
                { dispatch, queryFulfilled }
            ) {
                const { targetColumnIndex, columnId, currentBoardId } = columnDetails;

                // Optimistic update
                const changeResult = dispatch(columnsApi.util.updateQueryData("fetchColumnsByBoardId", currentBoardId,
                    (draft) => {
                        const column = draft.find(col => col.$id === columnId);
                        if (!column) {
                            toast({ title: "Error on moving column", variant: "destructive" });
                            return;
                        }

                        const sortedColumns = draft.filter(col => col.$id !== columnId);
                        sortedColumns.splice(targetColumnIndex, 0, column);
                        sortedColumns.forEach((column, i) => {
                            draft[i] = { ...column, index: i + 1 };
                        });
                    }
                ));

                queryFulfilled.catch(() => {
                    changeResult.undo();
                    toast({ title: "Error on moving column", variant: "destructive" });
                });
            }
        }),

        deleteColumn: build.mutation<{ isSuccess: boolean }, IColumn>({
            query: (column) => ({
                url: `/api/column/${column.$id}`,
                method: "DELETE"
            }),
            onQueryStarted(column, { queryFulfilled, dispatch }) {

                // Pessimistic update
                queryFulfilled.then(() => {
                    dispatch(columnsApi.util?.updateQueryData("fetchColumnsByBoardId", column.board.$id,
                        (draft) => {
                            draft.splice(column.index - 1, 1);
                        }
                    ));
                });
            }
        })
    })
});

export const {
    useCreateColumnMutation,
    useDeleteColumnMutation,
    useLazyFetchColumnsByBoardIdQuery,
    useMoveColumnMutation,
    useUpdateColumnMutation
} = columnsApi;