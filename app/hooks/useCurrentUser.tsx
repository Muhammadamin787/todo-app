/** @format */

import appAuthService from "@/services/AppwriteAuthServices";
import { IUser } from "@/utils/types";
import { setUser, useDispatch, useSelector } from "lib/redux";
import { useLayoutEffect, useState } from "react";

export function useCurrentUser(redirectTo?: (p: string) => void) {
    // Helper Hooks
    const dispatch = useDispatch();

    // Selectors
    const { user } = useSelector((state) => state.user);

    // State
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<IUser | null>(user);

    // Effects
    useLayoutEffect(() => {
        async function getCurrentUser() {
            try {
                const curUser = await appAuthService.account.get();
                if (curUser) {
                    dispatch(setUser(curUser));
                    setCurrentUser(curUser);
                }
            } catch (error) {
                console.log("ERR:", error);
            } finally {
                setLoading(false);
            }
        }

        if (!currentUser) getCurrentUser();
    }, []);

    return { currentUser, loading };
}
