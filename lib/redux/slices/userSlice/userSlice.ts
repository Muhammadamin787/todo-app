import { IUser } from "@/utils/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
    user: null,
};

export const userSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<IUser | null>) => {
            state.user = payload;
        }
        // setSession: (state, { payload }: PayloadAction<Models.Session | null>) => {
        //     state.session = payload;
        // }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

/* Types */
export interface UserSliceState {
    user: IUser | null;
}