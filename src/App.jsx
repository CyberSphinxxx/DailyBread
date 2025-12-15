import React, { useEffect, useState } from 'react';
import { BookOpen, Bookmark } from 'lucide-react'; // Added Bookmark for header icon
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
                date: format(new Date(), 'MMM d, yyyy') // Capture date saved
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
        <Layout>
            <header className="mb-10 text-center animate-in slide-in-from-top-4 duration-700 relative">
                <div className="flex items-center justify-center gap-3 mb-3 relative">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Daily Bread</h1>

                    {/* Favorites Toggle Button - Absolute positioned on desktop, relative flow on mobile? 
              Let's put it absolutely to the right for a clean header look. */}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                        title="View Collection"
                    >
                        <Bookmark className="w-6 h-6" />
                    </button>
                </div>
                <p className="text-gray-500 font-medium text-sm">Your daily dose of wisdom</p>
            </header>

            <VerseCard
                verse={verse}
                loading={loading}
                version={version}
                onVersionChange={setVersion}
                error={error}
                isFavorite={isCurrentVerseFavorite}
                onToggleFavorite={toggleFavorite}
            />

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

            {/* Viewing Favorite Overlay (Simple Modal reusing VerseCard logic could work, 
          but for now let's just make a dedicated simple read modal to avoid Hook complexity) */}
            {viewingFavorite && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setViewingFavorite(null)}>
                    <div className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        {/* reusing VerseCard with strict props to show the favorite. 
                 We pass no-ops for non-static props */}
                        <VerseCard
                            verse={viewingFavorite}
                            loading={false}
                            version={viewingFavorite.version}
                            onVersionChange={() => { }} // Read only
                            isFavorite={true}
                            onToggleFavorite={() => {
                                // Allow removing from modal?
                                removeFavorite(viewingFavorite);
                                setViewingFavorite(null);
                            }}
                        />
                        <button
                            onClick={() => setViewingFavorite(null)}
                            className="mt-4 mx-auto block text-white/80 hover:text-white text-sm font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </Layout>
    );
}

export default App;
