/** @format */

"use client";
import { pageURLs } from "@/utils/constans";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "lib/utils";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../shadcn/ui";
import FormField from "./components/FormField";
import { LoadingBalls } from "@/components/Loadings/LoadingBalls";
import { useAuth } from "@/context/AuthProvider";

const Schema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email(),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters!" })
});

type SchemaType = z.infer<typeof Schema>;

const config = {
    resolver: zodResolver(Schema)
};

function FormSignIn() {

    // Hooks
    const { signIn, isFetching } = useAuth();
    const router = useRouter();
    const methods = useForm<SchemaType>(config);
    const isFormDisabled = isFetching;

    return (
        <FormProvider {...methods}>
            <form
                className={cn("grid items-start gap-1", "className")}
                onSubmit={methods.handleSubmit(signIn)}
            >
                <FormField disabled={isFormDisabled} name="email" placeholder="Email" />
                <FormField disabled={isFormDisabled} name="password" placeholder="Password" />
                <Button className="mt-3" disabled={isFormDisabled}>
                    {isFetching ? <LoadingBalls /> : "Log in"}
                </Button>
                <Button
                    className="mt-3"
                    type="button"
                    variant="outline"
                    disabled={isFormDisabled}
                    onClick={() => router.push(pageURLs.signUp)}
                >
                    Create new account
                </Button>
            </form>
        </FormProvider>
    );
}

export default FormSignIn;
