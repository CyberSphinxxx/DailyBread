import React from 'react';

export function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {children}
            </div>
        </div>
    );
}
