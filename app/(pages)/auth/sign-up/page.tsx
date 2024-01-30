"use client";
import { FormSignUp } from "@/components/Forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui";
import { Separator } from "@/components/shadcn/ui/separator";
import { AuthProviders } from "@/utils/constans";
import { IconGoogle } from "@/utils/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import SocialAuthButton from "./components/SocialAuthButton";
import { useAuthLoading } from "@/context/AuthLoadingProvider";

const SignUp = () => {
    // Helper Hooks
    const { authLoading } = useAuthLoading();

    return (
        <div
            className={`h-screen w-full grid place-items-center ${authLoading ? "opacity-55" : ""}`}
        >
            <Card className="w-[350px]">
                <CardHeader className="text-center">
                    <CardTitle className=" text-2xl">Create account</CardTitle>
                    <CardDescription>
                        Create your account in one click
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between">
                        <SocialAuthButton
                            icon={<IconGoogle />}
                            text="Google"
                            disabled={authLoading}
                            provider={AuthProviders.GOOGLE}
                        />
                        <SocialAuthButton
                            icon={<GithubIcon />}
                            text="Github"
                            disabled={authLoading}
                            provider={AuthProviders.GITHUB}
                        />
                    </div>
                    <Separator className="my-4" />

                    <FormSignUp loading={authLoading} />
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUp;

const GithubIcon = () => (
    <GitHubLogoIcon
        style={{
            width: "18px",
            aspectRatio: "1/1"
        }}
    />
);
