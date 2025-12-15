import React from 'react';
import { BookOpen, Bookmark } from 'lucide-react';
import { format } from 'date-fns';

export function Header({ onOpenFavorites }) {
    const todayDate = format(new Date(), 'EEEE, MMM d').toUpperCase();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">

            {/* Left: Logo */}
            <div className="flex items-center gap-2 md:gap-3 group cursor-default">
                <div className="p-1.5 md:p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h1 className="text-lg md:text-xl font-bold text-stone-800 tracking-tight font-serif">Daily Bread</h1>
            </div>

            {/* Right: Date & Favorites */}
            <div className="flex items-center gap-4 md:gap-6">
                <span className="hidden md:block text-[10px] md:text-xs font-bold tracking-widest text-stone-400 font-sans">
                    {todayDate}
                </span>

                <button
                    onClick={onOpenFavorites}
                    className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all active:scale-95"
                    title="View Collection"
                    aria-label="Open favorites"
                >
                    <Bookmark className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>
        </header>
    );
}
