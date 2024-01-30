/* Core */
import { columnsApi, tasksApi, boardsApi } from "@/services/apiService";
// import { createLogger } from "redux-logger";

const reduxMiddleware = [
    // createLogger({
    //     duration: true,
    //     timestamp: false,
    //     collapsed: true,
    //     colors: {
    //         title: () => "#139BFE",
    //         prevState: () => "#1C5FAF",
    //         action: () => "#149945",
    //         nextState: () => "#A47104",
    //         error: () => "#ff0005",
    //     },
    //     predicate: () => typeof window !== "undefined",
    // }),
    columnsApi.middleware,
    tasksApi.middleware,
    boardsApi.middleware
];

export { reduxMiddleware };
