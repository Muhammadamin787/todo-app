/* Core */
import { type Action, configureStore, type ThunkAction } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";

/* Instruments */
import { reducer } from "./rootReducer";
import { reduxMiddleware } from "./reduxMiddleware";

export const reduxStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxMiddleware)
});


export const useDispatch = () => useAppDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useAppSelector;

// Types
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    Action
>;
