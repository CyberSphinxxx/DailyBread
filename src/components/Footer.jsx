import React from 'react';

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full text-center py-6 md:py-8 mt-auto">
            <p className="text-[10px] md:text-xs font-bold tracking-widest text-stone-300 uppercase select-none">
                © {year} Daily Bread. Word of God, Daily.
            </p>
        </footer>
    );
}
