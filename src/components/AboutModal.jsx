import React from 'react';
import { X, BookOpen, ExternalLink, Github } from 'lucide-react';

export function AboutModal({ isOpen, onClose }) {
    // We remove the early return to allow animations to play (fading out)
    // if (!isOpen) return null; 

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-md bg-stone-50/95 dark:bg-stone-900/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-8 md:p-10 overflow-hidden border border-white/50 dark:border-white/10 ring-1 ring-stone-900/5 dark:ring-white/5 transform transition-all duration-500 ease-out ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>

                {/* Ambient Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-white/10 rounded-full transition-all z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center mb-10 relative z-10">
                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-white dark:from-stone-800 dark:to-stone-800/50 rounded-2xl shadow-sm border border-indigo-100/50 dark:border-white/10 mb-5 text-indigo-900/80 dark:text-indigo-300">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">Daily Bread</h2>
                    <div className="h-1 w-12 bg-indigo-500/20 rounded-full mt-4"></div>
                </div>

                {/* Body */}
                <div className="space-y-10 text-center relative z-10">

                    {/* Quote Section */}
                    <div className="relative py-2">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-indigo-200/50 dark:text-white/5 font-serif leading-none select-none">“</span>
                        <p className="font-serif text-xl text-stone-700 dark:text-stone-300 italic leading-relaxed">
                            A digital sanctuary for your daily walk. <br />
                            <span className="text-indigo-600/80 dark:text-indigo-300/80">Zero distractions, just the Word.</span>
                        </p>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 gap-8 border-t border-stone-200 dark:border-white/5 pt-8">
                        <div>
                            <span className="font-sans font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 dark:text-stone-500 mb-3 block">Philosophy</span>
                            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs mx-auto">
                                Strictly one verse per day. <br />No scrolling. No notifications.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
                            <div>
                                <span className="font-sans font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 dark:text-stone-500 mb-2 block">Credits</span>
                                <a href="https://ourmanna.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    OurManna API
                                </a>
                            </div>

                            <div>
                                <span className="font-sans font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 dark:text-stone-500 mb-2 block">Developer</span>
                                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                                    John Lemar Gonzales
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Github Button */}
                    <div className="pt-2">
                        <a
                            href="https://github.com/CyberSphinxxx/DailyBread"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold tracking-widest text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:border-stone-300 dark:hover:border-stone-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <Github className="w-5 h-5 transition-transform group-hover:rotate-12" />
                            <span>VIEW ON GITHUB</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
