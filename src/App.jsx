import React, { useEffect, useState } from 'react';
import { useBibleVerse } from './hooks/useBibleVerse';
import { Layout } from './components/Layout';
import { VerseCard } from './components/VerseCard';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { format } from 'date-fns';

import { AboutModal } from './components/AboutModal';

function App() {
    const [version, setVersion] = useState('niv');
    const { verse, loading, error } = useBibleVerse(version);

    // Favorites Logic
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('daily_bread_favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.warn('Failed to load favorites', e);
            return [];
        }
    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [viewingFavorite, setViewingFavorite] = useState(null);

    // Font Logic
    const [currentFont, setCurrentFont] = useState(() => {
        return localStorage.getItem('daily_bread_font') || 'font-editorial';
    });

    useEffect(() => {
        localStorage.setItem('daily_bread_font', currentFont);
    }, [currentFont]);

    // Theme Logic
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem('daily_bread_theme');
            return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        } catch {
            return 'light';
        }
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('daily_bread_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Persistence
    useEffect(() => {
        localStorage.setItem('daily_bread_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Dynamic Title
    useEffect(() => {
        if (verse) {
            document.title = `Daily Bread | ${verse.reference}`;
        } else {
            document.title = 'Daily Bread';
        }
    }, [verse]);

    const toggleFavorite = () => {
        if (!verse) return;

        const isFav = favorites.some(
            f => f.reference === verse.reference && f.version === verse.version
        );

        if (isFav) {
            setFavorites(prev => prev.filter(
                f => !(f.reference === verse.reference && f.version === verse.version)
            ));
        } else {
            const newFav = {
                ...verse,
                date: format(new Date(), 'MMM d, yyyy')
            };
            setFavorites(prev => [newFav, ...prev]);
        }
    };

    const removeFavorite = (favToRemove) => {
        setFavorites(prev => prev.filter(f => f !== favToRemove));
    };

    const isCurrentVerseFavorite = verse ? favorites.some(
        f => f.reference === verse.reference && f.version === verse.version
    ) : false;

    return (
        <Layout
            onOpenFavorites={() => setIsDrawerOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
            isDarkMode={theme === 'dark'}
            toggleTheme={toggleTheme}
            currentFont={currentFont}
            onChangeFont={setCurrentFont}
        >

            <div className="w-full animate-in slide-in-from-bottom-4 duration-700">
                <VerseCard
                    verse={verse}
                    loading={loading}
                    version={version}
                    onVersionChange={setVersion}
                    error={error}
                    isFavorite={isCurrentVerseFavorite}
                    onToggleFavorite={toggleFavorite}
                    currentFont={currentFont}
                />
            </div>

            <FavoritesDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                favorites={favorites}
                onRemoveFavorite={removeFavorite}
                onSelectFavorite={(fav) => {
                    setViewingFavorite(fav);
                    setIsDrawerOpen(false);
                }}
            />

            <AboutModal
                isOpen={isAboutOpen}
                onClose={() => setIsAboutOpen(false)}
            />

            {/* Viewing Favorite Overlay */}
            {viewingFavorite && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setViewingFavorite(null)}>
                    <div className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        <VerseCard
                            verse={viewingFavorite}
                            loading={false}
                            version={viewingFavorite.version}
                            onVersionChange={() => { }} // Read only
                            isFavorite={true}
                            onToggleFavorite={() => {
                                removeFavorite(viewingFavorite);
                                setViewingFavorite(null);
                            }}
                            currentFont={currentFont}
                        />
                        <button
                            onClick={() => setViewingFavorite(null)}
                            className="mt-6 mx-auto block text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            Close View
                        </button>
                    </div>
                </div>
            )}

        </Layout>
    );
}

export default App;
