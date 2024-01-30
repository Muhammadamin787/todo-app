"use client";

import { PropsWithChildren, useEffect } from "react";
import { toast } from "@/components/shadcn/ui";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useAuthLoading } from "@/context/AuthLoadingProvider";

function layout({ children }: PropsWithChildren) {

    // // Helper Hooks
    // const { session } = useAuth();
    // const { authLoading } = useAuthLoading();
    // const router = useRouter();
    //
    // // Effects
    // useEffect(() => {
    //     if (!authLoading && session) {
    //         router.replace("/");
    //         setTimeout(() => {
    //             toast({
    //                 title: "Please log out first"
    //             });
    //         });
    //     }
    // }, [session, authLoading]);

    return children;
}

export default layout;