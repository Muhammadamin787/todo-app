/** @format */

import useBoards from "@/hooks/useBoards";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Button, toast } from "../shadcn/ui";
import FormField from "./components/FormField";
import { LoadingBalls } from "@/components/Loadings/LoadingBalls";
import appAuthService from "@/services/AppwriteAuthServices";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { isNull } from "lodash";

const BoardSchema = z.object({
    title: z.string().min(1, { message: "Title is required" })
});

type TypeFormBoard = z.infer<typeof BoardSchema>;

const config = {
    resolver: zodResolver(BoardSchema)
};

interface FormBoardProps {
    className?: string;
    setModal?: (p: boolean) => void;
}

function FormBoard({ className, setModal }: FormBoardProps) {
    // Hooks
    const { account } = useAuth();
    const methods = useForm<TypeFormBoard>(config);
    const { createBoard, isCreating } = useBoards();

    // Functions
    const onSave = (boardData: TypeFormBoard) => {
        if (!account) {
            toast({ title: "The Account is not found", variant: "destructive" });
            return;
        }

        createBoard({ ...boardData, userId: account.$id })
            .unwrap()
            .then(() => {
                if (setModal) setModal(false);
                toast({
                    title: `${boardData.title} board is created`
                });
            })
            .catch(() => {
                toast({
                    title: `ERROR: Board is not created`
                });
            });
    };

    return (
        <FormProvider {...methods}>
            <form
                className={cn("grid items-start gap-4", className)}
                onSubmit={methods.handleSubmit(onSave)}
            >
                <FormField name="title" placeholder="Name" />
                <Button type="submit" disabled={isCreating}>
                    {isCreating ? <LoadingBalls /> : "Save"}
                </Button>
            </form>
        </FormProvider>
    );
}

export default FormBoard;
