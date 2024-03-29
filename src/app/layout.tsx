import { ItemContextProvider } from "./_context";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Stree Shakti Prabodhan",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <ItemContextProvider>
                <body className={inter.className}>{children}</body>
                <Analytics />
            </ItemContextProvider>
        </html>
    );
}
