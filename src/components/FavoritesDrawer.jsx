import React from 'react';
import { X, Trash2, BookOpen, Bookmark } from 'lucide-react';

export function FavoritesDrawer({ isOpen, onClose, favorites, onRemoveFavorite, onSelectFavorite }) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-white/50 dark:border-stone-800 z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col pt-24">
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between">
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-800 dark:text-stone-200">Collection</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-3 md:space-y-4">
                        {favorites.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4">
                                    <Bookmark className="w-6 h-6 text-stone-300 dark:text-stone-600" />
                                </div>
                                <p className="text-stone-500 dark:text-stone-400 font-medium">No favorites yet</p>
                                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Tap the heart to save a verse</p>
                            </div>
                        ) : (
                            favorites.map((fav, index) => (
                                <div
                                    key={`${fav.reference}-${index}`}
                                    className="group p-4 md:p-6 rounded-xl bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-sm transition-all cursor-pointer relative"
                                    onClick={() => onSelectFavorite(fav)}
                                >
                                    <span className="text-[10px] md:text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2 block">
                                        {fav.date}
                                    </span>
                                    <p className="text-stone-800 dark:text-stone-200 font-serif text-base md:text-lg line-clamp-3 md:line-clamp-none mb-3">
                                        {fav.text}
                                    </p>
                                    <span className="text-xs md:text-sm font-medium text-stone-500 dark:text-stone-400">
                                        {fav.reference} ({fav.version})
                                    </span>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRemoveFavorite(fav);
                                        }}
                                        className="absolute top-2 right-2 p-2 text-stone-300 dark:text-stone-600 hover:text-red-400 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 md:p-6 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 text-center">
                        <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest font-bold">
                            {favorites.length} Saved Verses
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
