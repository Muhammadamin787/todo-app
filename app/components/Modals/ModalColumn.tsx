"use client";

import { ModalBaseProps } from "@/utils/types";
import { IBoard } from "@/utils/types/boardTypes";
import { FormColumn } from "../Forms";
import ModalBase from "./BaseModal";

interface ModalColumnProps extends ModalBaseProps {
    className?: string;
    boardId: IBoard["$id"];
}

function ModalColumn({ className, boardId, ...props }: ModalColumnProps) {

    return (
        <ModalBase {...props}>
            <FormColumn boardId={boardId} setModal={props.onOpenChange} />
        </ModalBase>
    );
}

export default ModalColumn;
