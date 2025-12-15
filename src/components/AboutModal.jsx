import React from 'react';
import { X, BookOpen, ExternalLink, Github } from 'lucide-react';

export function AboutModal({ isOpen, onClose }) {
    // We remove the early return to allow animations to play (fading out)
    // if (!isOpen) return null; 

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-md bg-white/95 dark:bg-stone-900/95 backdrop-blur-2xl rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.12)] p-10 overflow-hidden border border-white/50 dark:border-stone-800 ring-1 ring-stone-900/5 dark:ring-white/5 transform transition-all duration-500 ease-out ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100/50 dark:hover:bg-stone-800/50 rounded-full transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header (Unified) */}
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-2xl mb-4 text-indigo-900/80 dark:text-indigo-300">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">Daily Bread</h2>
                </div>

                {/* Body */}
                <div className="space-y-8 text-center">

                    <div className="relative">
                        <span className="absolute -top-4 -left-2 text-6xl text-indigo-100 dark:text-indigo-900/40 font-serif leading-none select-none">“</span>
                        <p className="font-serif text-lg text-stone-600 dark:text-stone-400 italic leading-relaxed relative z-10">
                            A digital sanctuary for your daily walk. Zero distractions, just the Word.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 dark:text-stone-500 block mb-2">Philosophy</span>
                            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs mx-auto">
                                Strictly one verse per day. No scrolling, no notifications, no dopamine loops.
                            </p>
                        </div>

                        <div>
                            <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 dark:text-stone-500 block mb-2">Credits</span>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                Scripture provided by <a href="https://ourmanna.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium decoration-indigo-200 dark:decoration-indigo-800 underline underline-offset-4">OurManna</a>
                            </p>
                        </div>

                        <div>
                            <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 dark:text-stone-500 block mb-2">Developer</span>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                Designed & Built by <span className="font-semibold text-stone-800 dark:text-stone-200">John Lemar Gonzales</span>
                            </p>
                        </div>
                    </div>

                    {/* Social / Github */}
                    <div className="pt-4">
                        <a
                            href="https://github.com/CyberSphinxxx/DailyBread"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-xs font-bold tracking-widest hover:bg-stone-800 dark:hover:bg-stone-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-stone-900/10 dark:shadow-black/20"
                        >
                            <Github className="w-4 h-4" />
                            <span>GITHUB</span>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
