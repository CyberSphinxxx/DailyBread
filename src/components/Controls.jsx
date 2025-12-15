import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Share2, BookOpen, Volume2, Square, Heart, Download, Copy, X } from 'lucide-react';



// Toast Component
function Toast({ message, visible }) {
    if (!visible) return null;

    return createPortal(
        <div className="fixed bottom-48 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-stone-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-stone-900 px-5 py-2.5 rounded-full text-xs font-medium shadow-xl border border-white/10 dark:border-stone-900/10 flex items-center gap-2">
                {message}
            </div>
        </div>,
        document.body
    );
}

export function Controls({ verse, isFavorite, onToggleFavorite, onDownloadImage, playVerse, isPlaying, isLoading }) {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleListen = () => {
        playVerse(verse.text, verse.reference);
    };

    // Native Share or Copy fallback
    const handleNativeShare = async () => {
        const textToShare = `"${verse.text}" - ${verse.reference}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Daily Bread',
                    text: textToShare,
                    url: window.location.href,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    handleCopyText();
                }
            }
        } else {
            handleCopyText();
        }
        setShowShareMenu(false);
    };

    const handleCopyText = async () => {
        const textToShare = `"${verse.text}" - ${verse.reference}`;
        await navigator.clipboard.writeText(textToShare);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        setShowShareMenu(false);
    };

    const handleDownloadClick = () => {
        onDownloadImage();
        setShowShareMenu(false);
    };

    // Calculate BibleGateway URL
    const bibleGatewayUrl = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(verse?.reference)}&version=${verse?.version || 'NIV'}`;

    return (
        <>
            <Toast message="Verse copied to clipboard" visible={showToast} />

            {/* Floating Island Container (Glassmorphism) */}
            <div className="mt-8 mb-8 mx-auto z-40 bg-white/40 dark:bg-stone-800/40 backdrop-blur-md shadow-lg ring-1 ring-black/5 dark:ring-white/10 border border-white/20 dark:border-stone-700/30 rounded-full px-6 py-2 md:px-8 md:py-3 flex items-center gap-6 md:gap-8 animate-in slide-in-from-bottom-10 fade-in duration-700 w-max transition-all hover:bg-white/60 dark:hover:bg-stone-800/60">

                {/* HEART BUTTON */}
                <button
                    onClick={onToggleFavorite}
                    className={`group flex items-center justify-center transition-all duration-300
            ${isFavorite ? 'text-red-400 hover:scale-110' : 'text-stone-400 dark:text-stone-500 hover:text-red-400 hover:scale-110 active:scale-95'}`}
                    title={isFavorite ? "Remove from collection" : "Save to collection"}
                    aria-label={isFavorite ? "Remove favorite" : "Add to favorites"}
                >
                    <Heart
                        className={`w-6 h-6 transition-all duration-300 ${isFavorite ? 'fill-current' : 'stroke-current'}`}
                    />
                </button>

                {/* Divider */}
                <div className="w-px h-4 bg-stone-300 dark:bg-stone-700"></div>

                {/* LISTEN BUTTON */}
                <button
                    onClick={handleListen}
                    disabled={isLoading}
                    className={`group flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
              ${isPlaying ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-400 dark:text-stone-500 hover:text-indigo-600 dark:hover:text-indigo-400'}
              ${isLoading ? 'cursor-wait opacity-80' : ''}`}
                    title={isPlaying ? "Stop" : "Listen"}
                    aria-label={isPlaying ? "Stop reading" : "Read verse aloud"}
                >
                    {isLoading ? (
                        <svg className="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : isPlaying ? (
                        <Square className="w-6 h-6 fill-current animate-pulse" />
                    ) : (
                        <Volume2 className="w-6 h-6" />
                    )}
                </button>

                {/* SHARE BUTTON */}
                <div className="relative">
                    <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="group relative flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-stone-400 dark:text-stone-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        title="Share"
                        aria-label="Share options"
                    >
                        {showShareMenu ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
                    </button>

                    {/* SHARE MENU */}
                    {showShareMenu && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 flex flex-col">
                            <button
                                onClick={handleCopyText}
                                className="px-4 py-3 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 text-sm font-medium transition-colors text-left"
                            >
                                <Copy className="w-4 h-4" />
                                Copy Text
                            </button>
                            <div className="h-px bg-stone-100 dark:bg-stone-700"></div>
                            <button
                                onClick={handleDownloadClick}
                                className="px-4 py-3 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 text-sm font-medium transition-colors text-left"
                            >
                                <Download className="w-4 h-4" />
                                Save Image
                            </button>
                        </div>
                    )}
                </div>

                {/* CONTEXT BUTTON */}
                <a
                    href={bibleGatewayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-stone-400 dark:text-stone-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                    title="Read Full Context"
                    aria-label="Read full context on BibleGateway"
                >
                    <BookOpen className="w-6 h-6" />
                </a>
            </div>
        </>
    );
}
