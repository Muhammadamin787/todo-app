/** @format */

"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/shadcn/ui/dialog";
import { ModalBaseProps } from "@/utils/types";
import { DialogDescription } from "@radix-ui/react-dialog";

function ModalBase({
    title,
    buttonTitle,
    description,
    children,
    ...props
}: ModalBaseProps) {
   
    // Functions
    return (
        // }
        <Dialog {...props}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
export default ModalBase;
