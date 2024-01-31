import { HeadDropdownMenu } from "./HeadDropdownMenu";
import React from "react";
import { HeaderNavigation } from "@/components/Header/components/Navigation";

function Header() {
    return (
        <header className="h-14 px-5 flex items-center justify-between border-b border-b-gray-200">
            <div className="flex gap-4">
                {/*<ButtonGoBack />*/}
                <HeaderNavigation />
            </div>
            <HeadDropdownMenu />
        </header>
    );
}

export default Header;
