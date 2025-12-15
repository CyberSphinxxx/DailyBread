import React from 'react';
import { BookOpen } from 'lucide-react';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <header className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Daily Bread</h1>
                </div>
                <p className="text-gray-600">Your daily dose of wisdom</p>
            </header>

            <main className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-800 text-lg mb-4">
                    "For where two or three share a common goal, I am there with them."
                </p>
                <p className="text-indigo-600 font-medium font-serif">- Matthew 18:20</p>
            </main>
        </div>
    );
}

export default App;
