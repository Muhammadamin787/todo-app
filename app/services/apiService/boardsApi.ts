import type { IBoard, IBoardListResponse, IBoardResponse } from "@/utils/types/boardTypes";
import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQueryWithAuth } from "lib/redux/jwtMiddleware";

export const boardsApi = createApi({
    reducerPath: "boardsApi",
    baseQuery: BaseQueryWithAuth,
    tagTypes: ["boardListData"],
    endpoints: (build) => ({

        fetchBoards: build.query<IBoardListResponse, void>({
            query: () => "/api/board",
            providesTags: ["boardListData"]
        }),

        createBoard: build.mutation<IBoard, Partial<IBoard>>({
            query: (body) => ({
                url: "/api/board",
                method: "POST",
                body
            }),
            onQueryStarted(_, { queryFulfilled, dispatch }) {

                // Pessimistic update
                queryFulfilled.then(({ data: board }) => {
                    dispatch(boardsApi.util?.updateQueryData("fetchBoards", undefined,
                        (draft) => {
                            draft.documents.push(board);
                        }
                    ));
                });

            }
        }),

        updateBoard: build.mutation<IBoard, Partial<IBoard>>({
            query: (body) => ({
                url: `/api/board/${body.$id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["boardListData"],
            transformResponse: (data: IBoardResponse) => data.document
        }),

        deleteBoard: build.mutation<{ isSuccess: boolean }, IBoard["$id"]>({
            query: (boardId) => ({
                url: `/api/board/${boardId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["boardListData"]
        })

    })
});

export const {
    useLazyFetchBoardsQuery,
    useCreateBoardMutation,
    useUpdateBoardMutation,
    useDeleteBoardMutation
} = boardsApi;