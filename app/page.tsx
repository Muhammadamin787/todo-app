"use client";

import { Header } from "./components/Header";
import { Container } from "./layouts";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthProvider";
import { useAuthLoading } from "@/context/AuthLoadingProvider";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { pageURLs } from "@/utils/constans";

const BoardList = dynamic(() => import("./components/Board/BoardList"));

export default function Home() {

    // Helper Hooks
    const { session } = useAuth();
    const { authLoading } = useAuthLoading();
    const router = useRouter();

    // Effects
    useLayoutEffect(() => {
        if (!authLoading && !session) {
            router.replace(pageURLs.signIn);
        }
    }, [session, authLoading]);

    return (
        <main className={`flex min-h-screen flex-col ${authLoading ? "opacity-55" : ""}`}>
            <Header />
            <Container>
                <BoardList />
            </Container>
        </main>
    );
}