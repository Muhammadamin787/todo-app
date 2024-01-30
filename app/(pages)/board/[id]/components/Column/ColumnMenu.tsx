import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    toast
} from "@/components/shadcn/ui";
import ColumnDeleteButton from "@/(pages)/board/[id]/components/Column/ColumnDeleteButton";
import { IColumn } from "@/utils/types";
import useColumns from "@/hooks/useColumns";
import { IconMenu } from "@/utils/icons";

interface IColumnMenuProps {
    column: IColumn;
    setLocalLoading: (v: boolean) => void;
}

const ColumnMenu = ({ column, setLocalLoading }: IColumnMenuProps) => {

    // Helper Hooks
    const { deleteColumn } = useColumns();

    // Functions
    const onDeleteColumn = () => {
        setLocalLoading(true);
        deleteColumn(column).unwrap()
            .then(() => {
                // if (res.isSuccess) {
                toast({
                    title: `${column.title} column is deleted`
                });
                // }
            })
            .finally(() => {
                setLocalLoading(false);
            });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 px-2">
                    <IconMenu />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <ColumnDeleteButton column={column} onClick={onDeleteColumn} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default ColumnMenu;
