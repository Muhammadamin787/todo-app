import { columnsApi, tasksApi, boardsApi } from "@/services/apiService";
import { boardSlice, columnSlice, taskSlice, userSlice } from "./slices";

export const reducer = {

    user: userSlice.reducer,
    boardSlice: boardSlice.reducer,
    taskSlice: taskSlice.reducer,
    columnSlice: columnSlice.reducer,

    [columnsApi.reducerPath]: columnsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer
};
