// import { useToast } from "@/components/shadcn/ui/use-toast";
// import { ToastTopStyle } from "@/utils/constans";
// import { AuthProvierValues, IErrorResponse } from "@/utils/types";
// import { AppwriteException, Models } from "appwrite";
// import { setUser, useDispatch } from "lib/redux";
// import { cn } from "lib/utils";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export function useAtuh() {
//     // Helper Hooks
//     const { toast } = useToast();
//     const disaptch = useDispatch();
//     const router = useRouter();

//     // States
//     const [user, setUsers] = useState<Models.Session>();
//     const [loading, setLoading] = useState(false);

//     // Functions
//     const registerBySocialMedia = async (socialMedia: AuthProvierValues) => {
//         try {
//           //   account.createOAuth2Session(
//           //       socialMedia,
//           //       "http://localhost:3000/",
//           //       "http://localhost:3000/sign-in",
//           //       // BASE_URL + pageURLs.signIn
//           //   );
//           //   const user = await account.get();
//           //   disaptch(setUser(user));
//         } catch (error) {
//             console.log(error as AppwriteException);
//         }
//     };

//     const register = async (
//         email: string,
//         password: string,
//         username: string | undefined,
//     ) => {
//         try {
//             setLoading(true);

//             await account.create(ID.unique(), email, password, username);
//             login(email, password);

//             toast({
//                 className: ToastTopStyle,
//                 title: "Succesflly logged!",
//                 description: "You can start use this app.",
//             });

//             router.replace("/");
//         } catch (e) {
//             const error = e as IErrorResponse;
//             switch (error.type) {
//                 case "user_already_exists": {
//                     toast({
//                         className: cn(
//                             "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//                         ),
//                         title: "This email already exists!",
//                         description: "You can try to login",
//                     });
//                     break;
//                 }
//                 default:
//                     console.error(error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const login = async (email: string, password: string) => {
//         try {
//             const user = await account.createEmailSession(email, password);
//             setUsers(user);
//             router.replace("/");
//             return user;
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const logout = async () => {
//         await account.deleteSession("current");
//     };

//     return { registerBySocialMedia, loading, register, login, logout, user };
// }
