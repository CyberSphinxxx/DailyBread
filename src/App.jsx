import React, { useEffect, useState } from 'react';
import { useBibleVerse } from './hooks/useBibleVerse';
import { Layout } from './components/Layout';
import { VerseCard } from './components/VerseCard';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { format } from 'date-fns';

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
    const [viewingFavorite, setViewingFavorite] = useState(null);

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
        <Layout onOpenFavorites={() => setIsDrawerOpen(true)}>

            <div className="w-full max-w-2xl animate-in slide-in-from-bottom-4 duration-700">
                <VerseCard
                    verse={verse}
                    loading={loading}
                    version={version}
                    onVersionChange={setVersion}
                    error={error}
                    isFavorite={isCurrentVerseFavorite}
                    onToggleFavorite={toggleFavorite}
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
