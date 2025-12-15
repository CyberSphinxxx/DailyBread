import React, { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { useBibleVerse } from './hooks/useBibleVerse';
import { Layout } from './components/Layout';

function App() {
    const { verse, loading, error } = useBibleVerse();

    useEffect(() => {
        console.log('App State:', { verse, loading, error });
    }, [verse, loading, error]);

    return (
        <Layout>
            <header className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Daily Bread</h1>
                </div>
                <p className="text-gray-600 font-medium">Your daily dose of wisdom</p>
            </header>

            <main className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 text-center border border-slate-100">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-800 text-xl leading-relaxed mb-6 font-serif">
                            "{verse?.text}"
                        </p>
                        <p className="text-indigo-600 font-semibold tracking-wide text-sm uppercase">
                            {verse?.reference} <span className="text-gray-400 font-normal normal-case ml-1">{verse?.version}</span>
                        </p>
                    </>
                )}
            </main>
        </Layout>
    );
}

export default App;
