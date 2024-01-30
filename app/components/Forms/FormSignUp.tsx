"use client";
import { LoadingBalls } from "@/components/Loadings/LoadingBalls";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "./components/FormField";
import { Button } from "../shadcn/ui";
import { pageURLs } from "@/utils/constans";
import { useRouter } from "next/navigation";
import { cn } from "lib/utils";
import * as z from "zod";
import { useAuth } from "@/context/AuthProvider";
import { useAuthLoading } from "@/context/AuthLoadingProvider";

const Schema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email(),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters!" }),
    name: z
        .string()
        .optional()
});

type SchemaType = z.infer<typeof Schema>;

const config = {
    resolver: zodResolver(Schema)
};

interface FormColumnProps {
    loading: boolean;
}

function FormSignUp({ loading }: FormColumnProps) {
    // Hooks
    const { setSession, isFetching, signUp } = useAuth();
    const { authLoading, startAuthLoading, stopAuthLoading } = useAuthLoading();
    const router = useRouter();
    const methods = useForm<SchemaType>(config);
    const isFormDisabled = isFetching;
    console.log({ isFormDisabled });
    // States
    // const [isRegitering, setRegistering] = useState(false);
    // const isFormDisabled = authLoading || loading;

    // Functions
    const onRegister = async (fields: SchemaType) => {
        // startAuthLoading();
        // setRegistering(true);
        router.prefetch("/");
        signUp(fields);
    };

    return (
        <FormProvider {...methods}>
            <form
                className={cn("grid items-start gap-1", "className")}
                onSubmit={methods.handleSubmit(onRegister)}
            >
                <FormField
                    disabled={isFormDisabled}
                    name="email"
                    placeholder="Email"
                />
                <FormField
                    disabled={isFormDisabled}
                    name="password"
                    placeholder="Password"
                />
                <FormField
                    disabled={isFormDisabled}
                    name="name"
                    placeholder="Username"
                />
                <Button className="mt-3 select-none" disabled={isFormDisabled}>
                    {authLoading ? <LoadingBalls /> : "Create"}
                </Button>
                <Button
                    className="mt-3 select-none"
                    type="button"
                    variant="outline"
                    disabled={isFormDisabled}
                    onClick={() => router.push(pageURLs.signIn)}
                >
                    {authLoading ? <LoadingBalls /> : "Go to LogIn"}
                </Button>
            </form>
        </FormProvider>
    );
}

export default FormSignUp;
