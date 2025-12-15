import React from 'react';
import { X, BookOpen, ExternalLink, Github } from 'lucide-react';

export function AboutModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.12)] p-10 overflow-hidden animate-in zoom-in-95 duration-300 border border-white/50 ring-1 ring-stone-900/5">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100/50 rounded-full transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header (Unified) */}
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-indigo-50/50 rounded-2xl mb-4 text-indigo-900/80">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-stone-900 tracking-tight">Daily Bread</h2>
                </div>

                {/* Body */}
                <div className="space-y-8 text-center">

                    <div className="relative">
                        <span className="absolute -top-4 -left-2 text-6xl text-indigo-100 font-serif leading-none select-none">“</span>
                        <p className="font-serif text-lg text-stone-600 italic leading-relaxed relative z-10">
                            A digital sanctuary for your daily walk. Zero distractions, just the Word.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 block mb-2">Philosophy</span>
                            <p className="text-sm text-stone-600 leading-relaxed max-w-xs mx-auto">
                                Strictly one verse per day. No scrolling, no notifications, no dopamine loops.
                            </p>
                        </div>

                        <div>
                            <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 block mb-2">Credits</span>
                            <p className="text-sm text-stone-600">
                                Scripture provided by <a href="https://ourmanna.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium decoration-indigo-200 underline underline-offset-4">OurManna</a>
                            </p>
                        </div>

                        <div>
                            <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-stone-400 block mb-2">Developer</span>
                            <p className="text-sm text-stone-600">
                                Designed & Built by <span className="font-semibold text-stone-800">John Lemar Gonzales</span>
                            </p>
                        </div>
                    </div>

                    {/* Social / Github */}
                    <div className="pt-4">
                        <a
                            href="https://github.com/CyberSphinxxx/DailyBread"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-full text-xs font-bold tracking-widest hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-stone-900/10"
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
