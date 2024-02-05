/** @format */

import { ReduxProvider } from "lib/ReduxProvider";
import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "./components/shadcn/ui/toaster";
import React from "react";
import { AuthLoadingProvider } from "@/context/AuthLoadingProvider";
import { AuthProvider } from "@/context/AuthProvider";

// const montserrat = Montserrat({
//     subsets: ["latin"],
//     display: "swap",
// });

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={GeistSans.className + " flex flex-col h-screen text-gray-600 "}>
        <ReduxProvider>
            <AuthLoadingProvider>
                <AuthProvider>
                    {/* nextjs, redux-toolkit, tailwind, shadcn/ui, appwrite */}
                    {children}
                </AuthProvider>
            </AuthLoadingProvider>
        </ReduxProvider>
        <Toaster />
        </body>
        </html>
    );
}

export const metadata = {
    openGraph: {
        title: "Todo App",
        description: "This is a todo management app",
        url: "https://todo-app-online.vercel.app/",
        siteName: "TodoApp",
        images: [
            {
                url: "https://cdn.dribbble.com/users/641978/screenshots/12840877/media/c69353ff1bd8ec83d22f3b1b31f3074e.png", // Must be an absolute URL
                width: 800,
                height: 600,
                alt: "My custom alt111"
            },
            {
                url: "https://cdn.dribbble.com/users/641978/screenshots/12840877/media/c69353ff1bd8ec83d22f3b1b31f3074e.png", // Must be an absolute URL
                width: 1800,
                height: 1600,
                alt: "My custom alt"
            }
        ],
        locale: "en_US",
        type: "website"
    }
};