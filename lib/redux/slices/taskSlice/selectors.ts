import { IColumn } from "@/utils/types";
import type { ReduxState } from "lib/redux";

export const selectTaskByColumnId = (state: ReduxState, columnId: IColumn["$id"]) => {
    return state.taskSlice.tasks[columnId];
};
export const selectTaskModal = (state: ReduxState) => state.taskSlice.modal
