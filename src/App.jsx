import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useBibleVerse } from './hooks/useBibleVerse';
import { Layout } from './components/Layout';
import { VerseCard } from './components/VerseCard';

function App() {
    const [version, setVersion] = useState('niv');
    const { verse, loading, error } = useBibleVerse(version);

    useEffect(() => {
        console.log('App State:', { verse, loading, error, version });
    }, [verse, loading, error, version]);

    return (
        <Layout>
            <header className="mb-10 text-center animate-in slide-in-from-top-4 duration-700">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Daily Bread</h1>
                </div>
                <p className="text-gray-500 font-medium text-sm">Your daily dose of wisdom</p>
            </header>

            <VerseCard
                verse={verse}
                loading={loading}
                version={version}
                onVersionChange={setVersion}
            />
        </Layout>
    );
}

export default App;
