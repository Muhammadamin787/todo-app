/** @format */

"use client";
import { Button } from "@/components/shadcn/ui";
import appAuthService from "@/services/AppwriteAuthServices";
import { AuthProvierValues } from "@/utils/types";
import { cn } from "../../../../../lib/utils";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthProvider";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: ReactNode;
    provider: AuthProvierValues;
    className?: string;
}

function SocialAuthButton({
                              icon = "",
                              text,
                              provider,
                              className,
                              ...props
                          }: Props) {

    const { signByProvider } = useAuth();

    const onClick = () => {
        signByProvider(provider);
    };

    return (
        <Button
            onClick={onClick}
            className={cn(
                "w-[125px] flex gap-2 items-center",
                className
            )}
            variant="outline"
            type="button"
            {...props}
        >
            {icon}
            {text}
        </Button>
    );
}

export default SocialAuthButton;
