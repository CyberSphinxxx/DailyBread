import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children, onOpenFavorites, onOpenAbout, isDarkMode, toggleTheme, currentFont, onChangeFont }) {
    return (
        <div className="h-screen flex flex-col bg-[#FAFAF9] dark:bg-stone-950 text-stone-900 dark:text-stone-300 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-200 relative transition-colors duration-500 box-border overflow-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-stone-200/50 dark:to-black/50 z-10"></div>

                {/* Large Ambient Orbs - Increased opacity and slightly darker tones for visibility */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse duration-[10000ms]"></div>
                <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-amber-200/30 dark:bg-amber-500/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob -z-10"></div>
            </div>

            <Header
                onOpenFavorites={onOpenFavorites}
                onOpenAbout={onOpenAbout}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                currentFont={currentFont}
                onChangeFont={onChangeFont}
            />

            <main className="flex-grow flex flex-col justify-center items-center px-4 pb-48 relative z-10 w-full max-w-7xl mx-auto">
                {children}
            </main>

            <Footer />
        </div>
    );
}
