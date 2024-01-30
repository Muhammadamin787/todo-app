/** @format */

import useColumns from "@/hooks/useColumns";
import { IBoard } from "@/utils/types/boardTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Button, toast } from "../shadcn/ui";
import FormField from "./components/FormField";
import { LoadingBalls } from "@/components/Loadings/LoadingBalls";
import { useAuth } from "@/context/AuthProvider";

const ColumnSchema = z.object({
    title: z.string().min(1, { message: "Title is required" })
});

type TypeFormColumn = z.infer<typeof ColumnSchema>;

const config = {
    resolver: zodResolver(ColumnSchema)
};

interface FormColumnProps {
    className?: string;
    boardId: IBoard["$id"];
    setModal?: (p: boolean) => void;
}

function FormColumn({ className, boardId, setModal }: FormColumnProps) {
    // Hooks
    const { account } = useAuth();
    const methods = useForm<TypeFormColumn>(config);
    const { createColumn, isCreating } = useColumns();

    // Functions
    const onSave = (fields: TypeFormColumn) => {
        if (!account) {
            toast({ title: "The Account is not found", variant: "destructive" });
            return;
        }

        const columnData = {
            ...fields,
            userId: account.$id,
            boardId
        };

        createColumn(columnData)
            .unwrap()
            .then(() => {
                if (setModal) setModal(false);
                toast({
                    title: `${fields.title} column is created`
                });
            })
            .catch(() => {
                toast({
                    title: `ERROR: Column is not created`
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

export default FormColumn;
