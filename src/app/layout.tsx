import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kerala Voter Search",
    description: "Search and find voter details easily.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-emerald-500/30`}>
                <div className="relative flex min-h-screen flex-col">
                    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
                        <div className="container mx-auto flex h-14 items-center px-4">
                            <div className="mr-4 hidden md:flex">
                                <a className="mr-6 flex items-center space-x-2" href="/">
                                    <span className="hidden font-bold sm:inline-block text-emerald-400">VoterSearch</span>
                                </a>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 container mx-auto p-4 md:p-8">
                        {children}
                    </main>
                    <footer className="py-6 md:px-8 md:py-0 border-t border-slate-800 mt-auto">
                        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                            <p className="text-balance text-center text-sm leading-loose text-slate-400 md:text-left">
                                Built for educational purposes.
                            </p>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
