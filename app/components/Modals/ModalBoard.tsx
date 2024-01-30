"use client";

import type { ModalBaseProps } from "@/utils/types";
import ModalBase from "./BaseModal";
import FormBoard from "@/components/Forms/FormBoard";

interface ModalBoardProps extends ModalBaseProps {
    className?: string;
}

function ModalBoard({ className, ...props }: ModalBoardProps) {

    return (
        <ModalBase {...props}>
            <FormBoard setModal={props.onOpenChange} />
        </ModalBase>
    );
}

export default ModalBoard;
