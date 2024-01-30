"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { reduxStore } from "lib/redux";
import { PropsWithChildren } from "react";

export const ReduxProvider = (props: PropsWithChildren) => {
    return <Provider store={reduxStore}>{props.children}</Provider>;
};
