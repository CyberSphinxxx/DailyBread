import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { Controls } from './Controls';

export function VerseCard({ verse, loading, version, onVersionChange, error }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const today = format(new Date(), 'EEEE, MMMM do');

    const versions = ['NIV', 'KJV', 'ESV', 'NET'];

    const handleVersionSelect = (v) => {
        onVersionChange(v);
        setShowDropdown(false);
    };

    return (
        <div className="relative group perspective-1000">
            {/* Paper Card */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14 w-full transition-all duration-500 overflow-visible hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] min-h-[400px]">

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply rounded-[2.5rem] overflow-hidden"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>

                {/* Content Wrapper */}
                <div className="flex flex-col items-center text-center relative z-10 w-full h-full">

                    {/* Header Row: Date & Version Selector */}
                    {!error && (
                        <div className="w-full flex justify-between items-center mb-8 md:mb-10 px-2">
                            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold text-stone-400/90 font-sans">
                                {today}
                            </span>

                            {/* Custom Version Selector */}
                            <div className="relative">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-stone-500 hover:text-indigo-600 uppercase tracking-wider bg-white/50 hover:bg-white px-3 py-1.5 rounded-full border border-transparent hover:border-indigo-100 transition-all duration-300 focus:outline-none"
                                    >
                                        <span>{version}</span>
                                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
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

                                    {/* Backdrop to close dropdown on outside click */}
                                    {showDropdown && (
                                        <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowDropdown(false)}></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Area */}
                    {error ? (
                        <div className="flex-grow flex items-center justify-center min-h-[300px] animate-in fade-in duration-700">
                            <p className="font-serif text-lg md:text-xl text-stone-500 text-center max-w-sm leading-relaxed">
                                The Daily Bread is being prepared.<br />Please check back later.
                            </p>
                        </div>
                    ) : loading ? (
                        <div className="w-full space-y-8 animate-pulse mt-8">
                            <div className="space-y-4">
                                <div className="h-4 bg-stone-200/50 rounded-full w-3/4 mx-auto"></div>
                                <div className="h-4 bg-stone-200/50 rounded-full w-5/6 mx-auto"></div>
                                <div className="h-4 bg-stone-200/50 rounded-full w-2/3 mx-auto"></div>
                                <div className="h-4 bg-stone-200/50 rounded-full w-1/2 mx-auto"></div>
                            </div>
                            <div className="h-3 bg-indigo-50 rounded-full w-32 mx-auto mt-12"></div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full flex flex-col justify-between flex-grow">
                            <div className="flex-grow flex items-center justify-center py-8">
                                <h2 className="font-serif text-3xl md:text-4xl leading-relaxed md:leading-relaxed text-stone-800 drop-shadow-sm select-none">
                                    "{verse?.text}"
                                </h2>
                            </div>

                            <div className="flex flex-col items-center gap-2 mt-8">
                                <p className="font-sans text-base font-bold text-indigo-700 tracking-wide">
                                    {verse?.reference}
                                </p>
                                <p className="font-sans text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                                    {verse?.version}
                                </p>

                                <Controls verse={verse} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
