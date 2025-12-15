import React from 'react';
import { BookOpen, Bookmark, Menu, Moon, Sun } from 'lucide-react';
import { format } from 'date-fns';

export function Header({ onOpenFavorites, onOpenAbout, isDarkMode, toggleTheme }) {
    const todayDate = format(new Date(), 'EEEE, MMM d').toUpperCase();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleOpenAbout = () => {
        setIsMenuOpen(false);
        onOpenAbout();
    };

    const handleOpenFavorites = () => {
        setIsMenuOpen(false);
        onOpenFavorites();
    };

    return (
        <>
            <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent transition-all duration-300">

                {/* Left: Logo (Serif & Bold) */}
                <div className="flex items-center gap-2 group cursor-default">
                    <div className="p-1.5 bg-indigo-50/50 dark:bg-indigo-500/20 rounded-lg text-indigo-900/80 dark:text-indigo-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 transition-colors">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight font-serif">Daily Bread</h1>
                </div>

                {/* Right: Metadata & Actions */}
                <div className="flex items-center gap-6">

                    {/* DESKTOP: About Link */}
                    <button
                        onClick={onOpenAbout}
                        className="hidden md:block text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                    >
                        About
                    </button>

                    {/* DESKTOP: Separator */}
                    <div className="hidden md:block w-px h-4 bg-stone-300/50 dark:bg-stone-700/50"></div>

                    {/* DESKTOP: Date */}
                    <span className="hidden md:block text-[10px] font-bold tracking-[0.2em] text-stone-400 dark:text-stone-500 font-sans uppercase">
                        {todayDate}
                    </span>

                    {/* DESKTOP: Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="hidden md:block p-2 text-stone-400 dark:text-stone-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {/* DESKTOP: Favorites Toggle */}
                    <button
                        onClick={onOpenFavorites}
                        className="hidden md:block p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-500/20 rounded-full transition-all active:scale-95"
                        title="View Collection"
                        aria-label="Open favorites"
                    >
                        <Bookmark className="w-5 h-5" />
                    </button>

                    {/* MOBILE: Hamburger Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors z-50 relative"
                        aria-label="Toggle menu"
                    >
                        {/* Animate between Menu and X icon potentially, or just keep it simple */}
                        <Menu className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                        {/* Close Icon Absolute positioned for smooth swap */}
                        {/* We will rely on the overlay's close button or just this button toggling if we want, 
                             BUT the requirements said "Close Button inside overlay". 
                             So we keep this as just the opener, but maybe let it morph? 
                             Let's just keep it simple as the opener for now. 
                          */}
                    </button>
                </div>
            </header>

            {/* MOBILE MENU OVERLAY */}
            <div
                className={`fixed inset-0 z-[60] bg-stone-900/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center space-y-8 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {/* Close Button Top Right */}
                <button
                    onClick={toggleMenu}
                    className="absolute top-6 right-6 p-2 text-stone-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                </button>

                {/* Menu Items */}
                <button
                    onClick={handleOpenAbout}
                    className="text-3xl font-serif text-white hover:text-indigo-300 transition-colors"
                >
                    About
                </button>

                <button
                    onClick={handleOpenFavorites}
                    className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors"
                >
                    <Bookmark className="w-5 h-5" />
                    <span>My Saved Verses</span>
                </button>

                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 text-stone-400 hover:text-amber-400 transition-colors text-lg"
                >
                    {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>
            </div>
        </>
    );
}
