import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children, onOpenFavorites }) {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Soft Warm Mesh Gradient */}
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-orange-100/40 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-50/50 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-indigo-50/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>

            <Header onOpenFavorites={onOpenFavorites} />

            <main className="flex-grow flex flex-col justify-center items-center px-4 py-8 relative z-10 w-full max-w-7xl mx-auto">
                {children}
            </main>

            <Footer />
        </div>
    );
}
