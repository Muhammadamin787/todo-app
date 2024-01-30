import { IBoard } from "@/utils/types/boardTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: BoardSliceState = {
    boards: [],
    loading: false,
    currentBoardId: null,
    modal: {
        open: false
    }
};

export const boardSlice = createSlice({
    name: "boardsApi",
    initialState,
    reducers: {
        setBoards: (state, { payload }: PayloadAction<IBoard[]>) => {
            state.boards = payload;
        },
        setBoardLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },
        setCurrentBoard: (state, { payload }: PayloadAction<IBoard["$id"]>) => {
            state.currentBoardId = payload;
        },
        // deleteBoard: (state, action: PayloadAction<IBoard>) => {
        //     // state.boards.push
        // },
        setBoardModal: (state, { payload }: PayloadAction<IBoardModal>) => {
            state.modal = payload;
        }

    }
});

export const { setBoards, setCurrentBoard, setBoardLoading, setBoardModal } = boardSlice.actions;

/* Types */
export interface BoardSliceState {
    boards: IBoard[];
    loading: boolean;
    currentBoardId: IBoard["$id"] | null;
    modal: {
        open: boolean,
        board?: Partial<IBoard>,
    };
}

type IBoardModal = BoardSliceState["modal"]
// type ITasksWithColumnAction = PayloadAction<{ columnId: IColumn["$id"]; tasks: ITask[] }>
