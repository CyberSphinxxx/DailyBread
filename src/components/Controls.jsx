import React, { useState } from 'react';
import { Share2, BookOpen, Check, Volume2, Square, Heart } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export function Controls({ verse, isFavorite, onToggleFavorite }) {
    const [copied, setCopied] = useState(false);
    const { speak, cancel, isSpeaking, hasSupport } = useTextToSpeech();

    const handleShare = async () => {
        const text = `"${verse.text}"\n- ${verse.reference} (${verse.version})`;
        const shareData = {
            title: 'Daily Bread Verse',
            text: text,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                throw new Error('Web Share API not supported');
            }
        } catch (err) {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (clipboardErr) {
                console.error('Failed to copy to clipboard', clipboardErr);
            }
        }
    };

    const handleListen = () => {
        if (isSpeaking) {
            cancel();
        } else {
            const textToRead = `${verse.text}. ${verse.reference}`;
            speak(textToRead);
        }
    };

    const encodedReference = encodeURIComponent(verse.reference);
    const bibleGatewayUrl = `https://www.biblegateway.com/passage/?search=${encodedReference}&version=${verse.version}`;

    return (
        // Floating Island Container
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-stone-200 rounded-full px-6 py-2.5 flex items-center gap-6 animate-in slide-in-from-bottom-10 fade-in duration-700">

            {/* HEART BUTTON */}
            <button
                onClick={onToggleFavorite}
                className={`group flex items-center justify-center transition-all duration-300
          ${isFavorite ? 'text-red-400 hover:scale-110' : 'text-stone-400 hover:text-red-400 hover:scale-110 active:scale-95'}`}
                title={isFavorite ? "Remove from collection" : "Save to collection"}
                aria-label={isFavorite ? "Remove favorite" : "Add to favorites"}
            >
                <Heart
                    className={`w-6 h-6 transition-all duration-300 ${isFavorite ? 'fill-current' : 'stroke-current'}`}
                />
            </button>

            {/* Divider */}
            <div className="w-px h-4 bg-stone-300"></div>

            {/* LISTEN BUTTON */}
            {hasSupport && (
                <button
                    onClick={handleListen}
                    className={`group flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
            ${isSpeaking ? 'text-indigo-600' : 'text-stone-400 hover:text-indigo-600'}`}
                    title={isSpeaking ? "Stop" : "Listen"}
                    aria-label={isSpeaking ? "Stop reading" : "Read verse aloud"}
                >
                    {isSpeaking ? (
                        <Square className="w-6 h-6 fill-current animate-pulse" />
                    ) : (
                        <Volume2 className="w-6 h-6" />
                    )}
                </button>
            )}

            {/* SHARE BUTTON */}
            <button
                onClick={handleShare}
                className="group relative flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-stone-400 hover:text-indigo-600"
                title="Share or Copy"
                aria-label="Share verse"
            >
                {copied ? (
                    <Check className="w-6 h-6 text-green-500 animate-in fade-in zoom-in" />
                ) : (
                    <Share2 className="w-6 h-6" />
                )}

                {/* Tooltip */}
                <span className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] font-medium py-1.5 px-3 rounded-full opacity-0 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${copied ? 'opacity-100' : ''}`}>
                    Copied!
                </span>
            </button>

            {/* CONTEXT BUTTON */}
            <a
                href={bibleGatewayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-stone-400 hover:text-indigo-600"
                title="Read Full Context"
                aria-label="Read full context on BibleGateway"
            >
                <BookOpen className="w-6 h-6" />
            </a>
        </div>
    );
}
