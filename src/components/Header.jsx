import React from 'react';
import { BookOpen, Bookmark, Menu, Moon, Sun } from 'lucide-react';
import { format } from 'date-fns';

export function Header({ onOpenFavorites, onOpenAbout, isDarkMode, toggleTheme }) {
    const todayDate = format(new Date(), 'EEEE, MMM d').toUpperCase();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/60 dark:bg-stone-900/60 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/50 transition-all duration-300">

            {/* Left: Logo (Serif & Bold) */}
            <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 bg-indigo-50/50 dark:bg-indigo-500/20 rounded-lg text-indigo-900/80 dark:text-indigo-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 transition-colors">
                    <BookOpen className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight font-serif">Daily Bread</h1>
            </div>

            {/* Right: Metadata & Actions */}
            <div className="flex items-center gap-6">

                {/* About Link */}
                <button
                    onClick={onOpenAbout}
                    className="hidden md:block text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                    About
                </button>

                {/* Separator */}
                <div className="hidden md:block w-px h-4 bg-stone-300/50 dark:bg-stone-700/50"></div>

                {/* Date */}
                <span className="hidden md:block text-[10px] font-bold tracking-[0.2em] text-stone-400 dark:text-stone-500 font-sans uppercase">
                    {todayDate}
                </span>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 text-stone-400 dark:text-stone-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Favorites Toggle */}
                <button
                    onClick={onOpenFavorites}
                    className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-500/20 rounded-full transition-all active:scale-95"
                    title="View Collection"
                    aria-label="Open favorites"
                >
                    <Bookmark className="w-5 h-5" />
                </button>

                {/* Mobile Menu Placeholder (Optional, for now handled by simple layout) */}
                <button className="md:hidden p-2 text-stone-400 hover:text-stone-600 transition-colors">
                    <Menu className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
