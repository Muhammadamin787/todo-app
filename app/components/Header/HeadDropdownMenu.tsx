/** @format */

"use client";
import { Github, LogOut, Mail, MessageSquare, PlusCircle, Settings, User, UserPlus } from "lucide-react";

import {
    Avatar,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/shadcn/ui";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSelector } from "lib/redux";
import { useAuth } from "@/context/AuthProvider";
import { IconDefaultAvatar } from "@/utils/icons";

interface Props {
    // currentUser: IUser | null;
}

export function HeadDropdownMenu({}: Props) {

    // Helper Hooks
    const { currentUser } = useCurrentUser();
    const { logOut, account } = useAuth();
    // const dispatch = useDispatch();

    // Selectors
    const { user } = useSelector((state) => state.user);

    // // Effects
    // useEffect(() => {
    //     if (!loading && !user) redirect(pageURLs.signIn);
    // }, [loading]);

    // Functions
    const onLogOut = () => {
        logOut();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 px-2">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-[1em] text-gray-800 py-0">{currentUser?.name}</h1>
                        <h4 className="text-[.78em] text-gray-400">{currentUser?.email}</h4>
                    </div>
                    <Avatar className="size-8 -mt-1">
                        {/*<AvatarImage*/}
                        {/*    sizes="4"*/}
                        {/*    src="https://github.com/shadcn.png"*/}
                        {/*    alt="@shadcn"*/}
                        {/*/>*/}
                        <IconDefaultAvatar />
                        {/* <AvatarFallback>CN</AvatarFallback> */}
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/*<DropdownMenuGroup>*/}
                {/*    <DropdownMenuItem>*/}
                {/*        <User className="mr-2 h-4 w-4" />*/}
                {/*        <span>Profile</span>*/}
                {/*        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
                {/*    </DropdownMenuItem>*/}
                {/*</DropdownMenuGroup>*/}
                {/* <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                {/*<DropdownMenuItem>*/}
                {/*    <Settings className="mr-2 h-4 w-4" />*/}
                {/*    <span>Settings</span>*/}
                {/*    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
                {/*</DropdownMenuItem>*/}
                {/* <DropdownMenuItem>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                {/*</DropdownMenuGroup>*/}
                {/*<DropdownMenuSeparator />*/}
                {/*<DropdownMenuGroup>*/}
                {/* <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Team</span>
                    </DropdownMenuItem> */}
                {/*<DropdownMenuSub>*/}
                {/*    <DropdownMenuSubTrigger>*/}
                {/*        <UserPlus className="mr-2 h-4 w-4" />*/}
                {/*        <span>Invite users</span>*/}
                {/*    </DropdownMenuSubTrigger>*/}
                {/*    <DropdownMenuPortal>*/}
                {/*        <DropdownMenuSubContent>*/}
                {/*            <DropdownMenuItem>*/}
                {/*                <Mail className="mr-2 h-4 w-4" />*/}
                {/*                <span>Email</span>*/}
                {/*            </DropdownMenuItem>*/}
                {/*            <DropdownMenuItem>*/}
                {/*                <MessageSquare className="mr-2 h-4 w-4" />*/}
                {/*                <span>Message</span>*/}
                {/*            </DropdownMenuItem>*/}
                {/*            <DropdownMenuSeparator />*/}
                {/*            <DropdownMenuItem>*/}
                {/*                <PlusCircle className="mr-2 h-4 w-4" />*/}
                {/*                <span>More...</span>*/}
                {/*            </DropdownMenuItem>*/}
                {/*        </DropdownMenuSubContent>*/}
                {/*    </DropdownMenuPortal>*/}
                {/*</DropdownMenuSub>*/}
                {/* <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                {/*</DropdownMenuGroup>*/}
                {/*<DropdownMenuSeparator />*/}
                {/*<DropdownMenuItem>*/}
                {/*    <Github className="mr-2 h-4 w-4" />*/}
                {/*    <span>GitHub</span>*/}
                {/*</DropdownMenuItem>*/}
                {/* <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem disabled>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>API</span>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
