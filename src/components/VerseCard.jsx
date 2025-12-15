import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown, WifiOff } from 'lucide-react';
import { Controls } from './Controls';

export function VerseCard({ verse, loading, version, onVersionChange, error, isFavorite, onToggleFavorite }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const today = format(new Date(), 'EEEE, MMMM do');

    const versions = ['NIV', 'KJV', 'ESV', 'NET'];

    const handleVersionSelect = (v) => {
        onVersionChange(v);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full text-center">

            {/* Version Selector (Kept, but styled minimally) */}
            {!error && (
                <div className="absolute top-0 right-0 z-20">
                    {/* Reusing existing logic but maybe position it differently in Header? 
                 Actually user asked to keep controls minimal. The version selector 
                 is functionally part of the "Card" logic but visually we can just 
                 keep it where it is or let Header handle it? 
                 
                 Wait, the Header has the Date and Favorites. 
                 The Version selector was in the Card Header.
                 Let's keep it simple: A minimal text dropdown above the verse.
             */}
                    <div className="relative group/select">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-stone-300 hover:text-indigo-600 uppercase tracking-widest transition-colors focus:outline-none"
                        >
                            <span>{version}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 top-full mt-2 w-24 bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl rounded-xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                                {versions.map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => handleVersionSelect(v)}
                                        className={`w-full text-center py-2 text-[10px] font-bold tracking-wider hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${version === v ? 'text-indigo-600 bg-indigo-50/50' : 'text-stone-500'}`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        )}

                        {showDropdown && (
                            <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowDropdown(false)}></div>
                        )}
                    </div>
                </div>
            )}

            {/* Content Area */}
            {error ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-700">
                    <p className="font-serif text-2xl md:text-3xl text-stone-400 text-center max-w-lg leading-relaxed italic">
                        "The Daily Bread is being prepared.<br />Please check back later."
                    </p>
                </div>
            ) : loading ? (
                <div className="w-full max-w-4xl mx-auto py-20 animate-pulse flex flex-col items-center">
                    {/* Drop Cap Shimmer */}
                    <div className="h-20 w-16 bg-stone-200/60 rounded-lg self-start md:ml-12 mb-4"></div>

                    {/* Text Lines Shimmer */}
                    <div className="w-full space-y-4">
                        <div className="h-6 bg-stone-200/50 rounded-md w-full"></div>
                        <div className="h-6 bg-stone-200/50 rounded-md w-[95%]"></div>
                        <div className="h-6 bg-stone-200/50 rounded-md w-[90%]"></div>
                        <div className="h-6 bg-stone-200/50 rounded-md w-[80%] mx-auto"></div>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full flex flex-col items-center py-12 md:py-20">

                    {/* Main Verse Text */}
                    <h2 className="font-serif text-3xl md:text-5xl leading-relaxed md:leading-[1.6] text-stone-800 drop-shadow-sm max-w-4xl mx-auto selection:bg-indigo-100 mb-12">
                        <span className="text-5xl md:text-7xl font-bold text-indigo-900/20 float-left mr-0 md:mr-1 mt-[-0.15em] font-serif">
                            {verse?.text.charAt(0)}
                        </span>
                        {verse?.text.slice(1)}
                    </h2>

                    {/* Separator */}
                    <div className="w-16 h-px bg-stone-300 mb-8"></div>

                    {/* Reference */}
                    <div className="flex flex-col items-center gap-1">
                        <p className="font-sans text-sm md:text-base font-bold text-stone-500 uppercase tracking-[0.2em]">
                            {verse?.reference}
                        </p>
                    </div>

                    {/* Controls - Passed Props */}
                    <Controls
                        verse={verse}
                        isFavorite={isFavorite}
                        onToggleFavorite={onToggleFavorite}
                    />
                </div>
            )}
        </div>
    );
}
