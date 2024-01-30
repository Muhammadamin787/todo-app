import { IColumn } from "@/utils/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ColumnSliceState = {
    columns: [],
    loading: false
};

export const columnSlice = createSlice({
    name: "columnsApi",
    initialState,
    reducers: {
        setColumns: (state, { payload }: PayloadAction<IColumn[]>) => {
            state.columns = payload;
        },
        setColumnLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        }
        // deleteColumn: (state, action: PayloadAction<IColumn>) => {
        //     // state.columns.push
        // },
    }
});

export const { setColumns,setColumnLoading } = columnSlice.actions;

/* Types */
export interface ColumnSliceState {
    columns: IColumn[];
    loading: boolean;
}
