/** @format */

import { Textarea } from "@/components/shadcn/ui";
import { TextareaHTMLAttributes } from "react";
import {
    Controller,
    UseControllerProps,
    useFormContext,
} from "react-hook-form";

interface FormFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    rules?: UseControllerProps["rules"];
    className?: string;
    name: string;
}

function FormTextarea({ name, rules, className, ...props }: FormFieldProps) {
    // Hooks
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field }) => <Textarea {...field} {...props}/>}
        />
    );
}

export default FormTextarea;
