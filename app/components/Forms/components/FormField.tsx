/** @format */

import { Input } from "@/components/shadcn/ui";
import { InputHTMLAttributes } from "react";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    rules?: UseControllerProps["rules"];
    name: string;
}

function FormField({ name, rules, ...props }: FormFieldProps) {
    // Hooks
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            rules={rules}
            control={control}
            disabled={props.disabled}
            render={({ field, fieldState }) => (
                <>
                    <Input {...props} {...field} />
                    <span className="text-sm text-red-500">
                        {fieldState.error?.message}
                    </span>
                </>
            )}
        />
    );
}

export default FormField;
