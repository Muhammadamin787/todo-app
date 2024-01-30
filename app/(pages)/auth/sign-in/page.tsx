"use client";

import { FormSignIn } from "@/components/Forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui";
import { Separator } from "@/components/shadcn/ui/separator";
import { AuthProviders } from "@/utils/constans";
import { IconGoogle } from "@/utils/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import SocialAuthButton from "../sign-up/components/SocialAuthButton";
import { useAuthLoading } from "@/context/AuthLoadingProvider";

const SignIn = () => {
    // Helper Hooks
    const { authLoading } = useAuthLoading();

    return (
        <div className={`h-screen w-full grid place-items-center ${authLoading ? "opacity-55" : ""}`}>
            <Card className="w-[350px]">
                <CardHeader className="text-center">
                    <CardTitle className=" text-2xl">Log in</CardTitle>
                    <CardDescription>
                        Log in with your social medias
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between">
                        <SocialAuthButton
                            provider={AuthProviders.GOOGLE}
                            icon={<IconGoogle />}
                            disabled={authLoading}
                            text="Google"
                        />
                        <SocialAuthButton
                            provider={AuthProviders.GITHUB}
                            icon={<GithubIcon />}
                            disabled={authLoading}
                            text="Github"
                        />
                    </div>

                    <Separator className="my-4" />

                    <FormSignIn />
                </CardContent>
            </Card>
        </div>
    );
};

export default SignIn;

const GithubIcon = () => (
    <GitHubLogoIcon
        style={{
            width: "18px",
            aspectRatio: "1/1"
        }}
    />
);
