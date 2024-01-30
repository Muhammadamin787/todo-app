"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface IAuthLoadingContext {
    authLoading: boolean;
    startAuthLoading: () => void;
    stopAuthLoading: () => void;
}

const initialValues: IAuthLoadingContext = {
    authLoading: true,
    startAuthLoading: () => {
    },
    stopAuthLoading: () => {

    }
};

const AuthLoadingContext = createContext(initialValues);

export const AuthLoadingProvider = ({ children }: PropsWithChildren) => {

    // States
    const [authState, setAuthState] = useState<IAuthLoadingContext>(initialValues);

    // // Effects
    // useEffect(() => {
    //     const checkCurrentUser = async () => {
    //         try {
    //             const session = await appAuthService.account.getSession("current") as Models.Session;
    //             setAuth(prev => ({ ...prev, session, loading: false }));
    //         } catch (err) {
    //             setAuth(prev => ({ ...prev, session: null, loading: false }));
    //         }
    //     };
    //     checkCurrentUser();
    // }, []);

    function startAuthLoading() {
        setAuthState(prev => ({
            ...prev,
            authLoading: true
        }));
    }

    function stopAuthLoading() {
        setAuthState(prev => ({
            ...prev,
            authLoading: false
        }));

    }

    const value: IAuthLoadingContext = {
        ...authState,
        startAuthLoading,
        stopAuthLoading
    };

    return (
        <AuthLoadingContext.Provider value={value}>
            {children}
            {/*{authState.authLoading ? "Global-Page..." : children}*/}
        </AuthLoadingContext.Provider>
    );
};

export function useAuthLoading() {
    return useContext(AuthLoadingContext);
}