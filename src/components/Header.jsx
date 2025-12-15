import React from 'react';
import { BookOpen, Bookmark, Menu } from 'lucide-react';
import { format } from 'date-fns';

export function Header({ onOpenFavorites }) {
    const todayDate = format(new Date(), 'EEEE, MMM d').toUpperCase();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-md border-b border-stone-200/50 transition-all duration-300">

            {/* Left: Logo (Serif & Bold) */}
            <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 bg-indigo-50/50 rounded-lg text-indigo-900/80 group-hover:bg-indigo-100 transition-colors">
                    <BookOpen className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold text-stone-900 tracking-tight font-serif">Daily Bread</h1>
            </div>

            {/* Right: Metadata & Actions */}
            <div className="flex items-center gap-6">

                {/* About Link */}
                <a href="#" className="hidden md:block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
                    About
                </a>

                {/* Separator */}
                <div className="hidden md:block w-px h-4 bg-stone-300/50"></div>

                {/* Date */}
                <span className="hidden md:block text-[10px] font-bold tracking-[0.2em] text-stone-400 font-sans uppercase">
                    {todayDate}
                </span>

                {/* Mobile Menu (Replaces About/Date on small screens) */}
                <button className="md:hidden p-2 text-stone-400 hover:text-stone-600 transition-colors">
                    <Menu className="w-5 h-5" />
                </button>

                {/* Favorites Toggle */}
                <button
                    onClick={onOpenFavorites}
                    className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all active:scale-95"
                    title="View Collection"
                    aria-label="Open favorites"
                >
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
