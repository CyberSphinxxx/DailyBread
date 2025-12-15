import React from 'react';

export function Layout({ children }) {
    return (
        <div className="min-h-screen relative bg-stone-50 flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-orange-100 selection:text-stone-900">
            {/* Warm Gradient Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-in fade-in duration-1000"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-in fade-in duration-1000 delay-300"></div>
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50%] h-[50%] bg-indigo-50/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>

            {/* Content Container */}
            <div className="w-full max-w-lg z-10 relative">
                {children}
            </div>
        </div>
    );
}
