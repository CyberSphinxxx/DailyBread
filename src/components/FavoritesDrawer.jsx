import React from 'react';
import { X, Trash2, BookOpen } from 'lucide-react';

export function FavoritesDrawer({ isOpen, onClose, favorites, onRemoveFavorite, onSelectFavorite }) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full bg-stone-50">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-serif font-bold text-stone-800">Your Collection</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {favorites.length === 0 ? (
                            <div className="text-center py-10 opacity-50">
                                <p className="text-stone-400 text-sm">No saved verses yet.</p>
                            </div>
                        ) : (
                            favorites.map((fav) => (
                                <div
                                    key={`${fav.reference}-${fav.version}-${fav.date}`} // Unique key
                                    className="group bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer relative"
                                    onClick={() => onSelectFavorite(fav)}
                                >
                                    <div className="mb-2 flex justify-between items-start">
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">
                                            {fav.date}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemoveFavorite(fav);
                                            }}
                                            className="text-stone-300 hover:text-red-400 transition-colors p-1"
                                            title="Remove from favorites"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="font-serif text-stone-800 leading-relaxed line-clamp-2 mb-2">
                                        "{fav.text}"
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-indigo-600 font-sans">{fav.reference}</span>
                                        <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-md">{fav.version}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-stone-200 bg-white text-center">
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                            {favorites.length} Saved Verses
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
