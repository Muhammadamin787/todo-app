"use client";

import { IColumn, ITask } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { setTaskModal, useDispatch } from "lib/redux";
import { cn } from "lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Button, toast } from "../shadcn/ui";
import FormField from "./components/FormField";
import FormTextarea from "./components/FormTextarea";
import useTasks from "@/hooks/useTasks";
import { LoadingBalls } from "@/components/Loadings/LoadingBalls";
import { useAuth } from "@/context/AuthProvider";

const TaskSchema = z.object({
    title: z.string({ required_error: "Title is required" }).min(1, "String must contain at least 1 character"),
    description: z.string().optional()
});

type TypeFormTask = z.infer<typeof TaskSchema>;

interface FormTaskProps {
    className?: string;
    columnId: IColumn["$id"] | undefined;
    data?: Partial<ITask>;
}

function FormTask({ data, columnId = "", className }: FormTaskProps) {

    // Helper Hooks
    const { account } = useAuth();
    const dispatch = useDispatch();

    const {
        createTask,
        isCreating,
        updateTask,
        isUpdating
    } = useTasks({ columnId });

    const methods = useForm<TypeFormTask>({
        defaultValues: data,
        resolver: zodResolver(TaskSchema)
    });

    // Functions
    const formLoading = isCreating || isUpdating;

    const onSave = async (fields: TypeFormTask) => {
        if (!account) {
            toast({ title: "The Account is not found", variant: "destructive" });
            return;
        }

        const body = {
            ...fields,
            userId: account.$id,
            columnId
        };

        if (!data?.$id) {
            createTask(body)
                .unwrap()
                .then(() => {
                    dispatch(setTaskModal({ open: false }));
                    toast({
                        title: "Successfully added!"
                    });
                });
        } else {
            updateTask({ ...body, id: data.$id })
                .unwrap()
                .then(() => {
                    dispatch(setTaskModal({ open: false }));
                    toast({
                        title: "Successfully updated!"
                    });
                });
        }

    };

    return (
        <FormProvider {...methods}>
            <form
                className={cn("grid items-start gap-4", className)}
                onSubmit={methods.handleSubmit(onSave)}
            >
                <h1 className="text-lg">Add Task</h1>
                <FormField name="title" placeholder="Name" />
                <FormTextarea
                    name="description"
                    placeholder="Description (Optional)"
                    style={{ maxHeight: "300px", height: "120px" }} />
                <Button type="submit" disabled={formLoading}>
                    {formLoading ? <LoadingBalls /> : data?.$id ? "Update" : "Save"}
                </Button>
            </form>
        </FormProvider>
    );
}

export default FormTask;
