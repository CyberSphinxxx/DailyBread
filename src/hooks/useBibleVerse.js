import { useState, useEffect } from 'react';

export function useBibleVerse(version = 'NIV') {
    const [verse, setVerse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVerse = async () => {
            setLoading(true);
            setError(null);

            // Ensure specific version requesting
            const versionParam = version.toUpperCase();

            try {
                const response = await fetch(`https://beta.ourmanna.com/api/v1/get?format=json&order=daily&version=${versionParam}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setVerse(data.verse.details);
            } catch (err) {
                console.error('Failed to fetch verse:', err);
                setError(err);
                setVerse(null);
            } finally {
                setLoading(false);
            }
        };

        fetchVerse();
    }, [version]);

    return { verse, loading, error };
}
