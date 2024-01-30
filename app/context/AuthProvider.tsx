"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { AuthProvierValues, ISignUpPayload, IUser } from "@/utils/types";
import { ID, Models } from "appwrite";
import appAuthService from "@/services/AppwriteAuthServices";
import { toast } from "@/components/shadcn/ui";
import { useRouter } from "next/navigation";
import { BASE_URL, pageURLs } from "@/utils/constans";
import { AppwriteException } from "node-appwrite";
import { useAuthLoading } from "@/context/AuthLoadingProvider";
import { setUser, useDispatch } from "lib/redux";
import { createJWT, removeJWT } from "@/utils/helperFunctions";

interface IAuthContext {
    loading: boolean;
    isFetching: boolean;
    logOut: () => void;
    account: IUser | null,
    session: Models.Session | null;
    signIn: ({ email, password }: { email: string, password: string }) => void;
    signByProvider: (p: AuthProvierValues) => void;
    signUp: ({}: ISignUpPayload) => void;
    setSession: (s: Models.Session | null) => void
}

const initialValues: IAuthContext = {
    loading: true,
    isFetching: false,
    account: null,
    session: null,
    logOut: () => {
    },
    signIn: () => {
    },
    signByProvider: () => {
    },
    signUp: () => {
    },
    setSession: () => {
    }
};

const AuthContext = createContext(initialValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {

    // Helper Hooks
    const dispatch = useDispatch();
    const router = useRouter();
    const { startAuthLoading, stopAuthLoading } = useAuthLoading();

    // States
    const [auth, setAuth] = useState<IAuthContext>(initialValues);

    // Effects
    useEffect(() => {
        if (auth.session) {
            // alert("LOGGEED OUT");
        } else {
            startAuthLoading();
            const checkCurrentUser = async () => {
                try {
                    const account = await appAuthService.account.get() as IUser;
                    console.log({ account });
                    const session = await appAuthService.account.getSession("current");
                    setAuth(prev => ({ ...prev, session, account }));
                    dispatch(setUser(account));
                    setTimeout(() => {
                        stopAuthLoading();
                    }, 10);

                } catch (err) {
                    stopAuthLoading();
                }
            };
            checkCurrentUser();
        }
    }, []);

    async function signIn({ email, password }: { email: string, password: string }) {
        setAuth(prev => ({
            ...prev,
            loading: true,
            isFetching: true
        }));
        try {
            const session = await appAuthService.account.createEmailSession(email, password);
            setAuth(prev => ({
                ...prev,
                session,
                loading: false,
                isFetching: false
            }));

            await createJWT();
            router.replace(pageURLs.main);
            // toast({
            //     title: "Welcome back!"
            // });
        } catch (error) {
            toast({
                title: (error as AppwriteException).message,
                variant: "destructive"
            });
            setAuth(prev => ({
                ...prev,
                loading: false,
                isFetching: false
            }));
        }
    }

    async function signUp({ email, password, name, userId = ID.unique() }: ISignUpPayload) {
        setAuth(prev => ({
            ...prev,
            loading: true,
            isFetching: true
        }));
        try {
            const createdUser = await appAuthService.account.create(userId, email, password, name);
            if (createdUser) {
                return await signIn({ email, password });
            }
        } catch (error) {
            toast({
                title: (error as AppwriteException).message,
                variant: "destructive"
            });
            setAuth(prev => ({
                ...prev,
                loading: false,
                isFetching: false
            }));
        }
    }

    function logOut() {
        startAuthLoading();
        appAuthService.account.deleteSessions()
            .then(() => {
                removeJWT();
                setAuth(prev => ({
                    ...prev,
                    session: null
                }));
                router.replace(pageURLs.signIn);
                stopAuthLoading();
            })
            .catch(err => {
                console.log(err);
                toast({
                    variant: "destructive",
                    title: "Failed to logOut"
                });
            })
            .finally(() => {
                stopAuthLoading();
            });
    }

    async function signByProvider(provider: AuthProvierValues) {
        try {
            appAuthService.account.createOAuth2Session(provider,
                BASE_URL + pageURLs.main,
                BASE_URL + pageURLs.signIn
            );
            await createJWT();
        } catch (error) {
            console.log("signByProvider error: ", error);
        }
    }

    function setSession(session: Models.Session | null) {
        setAuth(prev => ({
            ...prev,
            session
        }));
    }

    const value: IAuthContext = {
        ...auth,
        signIn,
        signUp,
        setSession,
        logOut,
        signByProvider
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}