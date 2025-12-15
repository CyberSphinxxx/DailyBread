import React, { useRef, useCallback, useState } from 'react';
import { toPng } from 'html-to-image';
import { ChevronDown, WifiOff } from 'lucide-react';
import { Controls } from './Controls';

export function VerseCard({
    verse,
    loading,
    version,
    onVersionChange,
    error,
    isFavorite,
    onToggleFavorite,
}) {
    const cardRef = useRef(null);

    const handleDownloadImage = useCallback(async () => {
        if (!cardRef.current) return;

        try {
            // Filter out the controls
            const filter = (node) => {
                const exclusionClasses = ['controls-container'];
                return !exclusionClasses.some((classname) => node.classList?.contains(classname));
            };

            const dataUrl = await toPng(cardRef.current, {
                filter: filter,
                pixelRatio: 2, // Higher quality
                width: 1200, // Force a consistent standard width
                style: {
                    padding: '80px', // Add generous padding
                    margin: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                // Use onClone to modify the "virtual" captured node without touching the real DOM
                onClone: (clonedNode) => {
                    // 1. Add the Social Media Card Gradient Background
                    clonedNode.style.background = 'radial-gradient(circle at center, #fffbeb, #ffffff, #f5f5f4)'; // amber-50 via white to stone-100 preset

                    // 2. Force Text Color to Dark (Stone-800) so it pops on light bg
                    // We need to recursively force this or target the h2 specifically
                    clonedNode.style.color = '#292524'; // text-stone-800

                    // Ensure the background is opaque
                    clonedNode.style.borderRadius = '0';
                },
            });

            const link = document.createElement('a');
            link.download = `daily-bread-${new Date().toISOString().split('T')[0]}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate image', err);
            alert('Could not generate image. Please try again.');
        }
    }, [cardRef]);

    const [isVersionOpen, setIsVersionOpen] = useState(false);



    return (
        <div ref={cardRef} className="relative w-full text-center bg-transparent transition-colors duration-500 p-8">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full flex flex-col items-center justify-center min-h-[60vh] py-12 md:py-32">

                {/* ERROR STATE */}
                {error && (
                    <div className="w-full max-w-4xl mx-auto py-20 flex flex-col items-center text-stone-500 dark:text-stone-400">
                        <WifiOff className="w-16 h-16 mb-4" />
                        <p className="text-lg font-semibold mb-2">Connection Error</p>
                        <p className="text-sm text-center">
                            Could not load the verse. Please check your internet connection.
                        </p>
                    </div>
                )}

                {/* LOADING STATE */}
                {loading && (
                    <div className="w-full max-w-4xl mx-auto py-20 animate-pulse flex flex-col items-center">
                        <div className="h-20 w-16 bg-stone-200/60 rounded-lg self-start md:ml-12 mb-4"></div>
                        <div className="w-full space-y-4">
                            <div className="h-6 bg-stone-200/50 rounded-md w-full"></div>
                            <div className="h-6 bg-stone-200/50 rounded-md w-[95%]"></div>
                            <div className="h-6 bg-stone-200/50 rounded-md w-[90%]"></div>
                            <div className="h-6 bg-stone-200/50 rounded-md w-[80%] mx-auto"></div>
                        </div>
                    </div>
                )}

                {/* CONTENT */}
                {!loading && !error && verse && (
                    <>
                        {/* Verse Reference - REMOVED DUPLICATE displayed at top */}
                        <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
                        </div>

                        {/* Verse Text */}
                        {/* Holy Glow Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-white/40 via-transparent to-transparent dark:from-stone-800/20 pointer-events-none blur-3xl -z-10"></div>

                        {/* Verse Text: Fluid Typography */}
                        <h2 className="font-serif font-normal italic antialiased text-[clamp(1.5rem,6vw,3.5rem)] leading-tight text-stone-700 dark:text-stone-300 max-w-md md:max-w-7xl mx-auto mb-12 px-4 md:px-8 relative z-10">
                            {verse.text}
                        </h2>

                        {/* Divider */}
                        <div className="w-16 h-px bg-stone-200 dark:bg-stone-800 mx-auto my-12"></div>

                        {/* Merged Metadata: Reference • Version */}
                        <div className="flex items-center justify-center gap-3 mb-12 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400">
                            <span>{verse.reference}</span>
                            <span className="text-stone-300 dark:text-stone-700">•</span>

                            {/* Version Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsVersionOpen(!isVersionOpen)}
                                    className="hover:text-stone-600 dark:hover:text-stone-300 transition-colors flex items-center gap-1"
                                >
                                    {version}
                                </button>

                                {isVersionOpen && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                        {['NIV', 'KJV', 'ESV', 'NET'].map((v) => (
                                            <button
                                                key={v}
                                                onClick={() => {
                                                    onVersionChange(v);
                                                    setIsVersionOpen(false);
                                                }}
                                                className={`w-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-center transition-colors hover:bg-stone-50 dark:hover:bg-stone-800 ${version === v ? 'text-indigo-600 dark:text-indigo-400 bg-stone-50/50 dark:bg-stone-800/50' : 'text-stone-500 dark:text-stone-400'}`}
                                            >
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Overlay to close on click outside */}
                                {isVersionOpen && (
                                    <div className="fixed inset-0 z-10 cursor-default" onClick={() => setIsVersionOpen(false)}></div>
                                )}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="controls-container">
                            <Controls
                                verse={verse}
                                isFavorite={isFavorite}
                                onToggleFavorite={onToggleFavorite}
                                onDownloadImage={handleDownloadImage}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
