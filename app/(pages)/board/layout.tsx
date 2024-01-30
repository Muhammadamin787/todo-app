"use client";

import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    // Helper Hooks
    // const router = useRouter()
    // const [session, saveSession] = useSessionStorage("trello-user-session", "");
    
    // if (!session) router.replace(pageURLs.signIn)

    return children;
}
