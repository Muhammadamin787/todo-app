import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BASE_URL } from "@/utils/constans";
import { ReduxState } from "./store";
import appAuthService from "@/services/AppwriteAuthServices";
import { IPrimaryError, IUser } from "@/utils/types";
import { createJWT } from "@/utils/helperFunctions";
import { toast } from "@/components/shadcn/ui";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
        const state = getState() as ReduxState;
        const userId = state.user && state.user.user?.$id;

        // Set userId to header
        if (userId) {
            headers.set("x-user-id", userId);
        } else {
            const user = await appAuthService.account.get() as IUser;
            headers.set("x-user-id", user.$id);
        }
    }
});

type IBaseQueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>

export const BaseQueryWithAuth: IBaseQueryFn = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);

    if (
        typeof args === "string" && args.startsWith("/api") ||
        typeof args !== "string" && args.url.startsWith("/api")
    ) {
        if (result.error) {
            if ("status" in result.error) {
                const error = (result.error.data || {}) as IPrimaryError;

                switch (result.error.status) {
                    case 401: {
                        // Refresh token
                        await createJWT();
                        result = await baseQuery(args, api, extraOptions);
                        break;
                    }
                    case 404: {
                        toast({
                            title: error.message || "Error [404]",
                            variant: "destructive"
                        });
                        break;
                    }
                    case 500: {
                        toast({
                            title: error.message || "Server Error [500]",
                            variant: "destructive"
                        });
                        break;
                    }
                }
            }
        }
    }
    console.log(result);
    return result;
};