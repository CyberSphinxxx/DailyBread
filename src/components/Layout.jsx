import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children, onOpenFavorites }) {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Large Ambient Orbs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-3xl -z-10 animate-pulse duration-[10000ms]"></div>
                <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-amber-50/40 rounded-full blur-[100px] mix-blend-multiply animate-blob -z-10"></div>
            </div>

            <Header onOpenFavorites={onOpenFavorites} />

            <main className="flex-grow flex flex-col justify-center items-center px-4 py-8 relative z-10 w-full max-w-7xl mx-auto">
                {children}
            </main>

            <Footer />
        </div>
    );
}
