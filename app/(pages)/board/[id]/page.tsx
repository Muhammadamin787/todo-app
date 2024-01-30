import { Header } from "@/components/Header";
import { Fragment } from "react";
import { Container } from "@/layouts";
import { ColumnList } from "@/(pages)/board/[id]/components/Column";

interface PageBoardProps {
    params: {
        id: string;
    };
}

export default function PageBoard({ params }: PageBoardProps) {
    return (
        <Fragment>
            <Header />
            <Container className="flex">
                <ColumnList boardId={params.id} />
            </Container>
        </Fragment>
    );
}
