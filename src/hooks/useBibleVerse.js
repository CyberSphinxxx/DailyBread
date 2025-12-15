import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function useBibleVerse(version = 'NIV') {
    const [verse, setVerse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVerse = async () => {
            setLoading(true);
            setError(null);

            const todayNum = format(new Date(), 'yyyy-MM-dd');
            const versionParam = version.toUpperCase();
            const cacheKey = `daily_bread_${versionParam}_${todayNum}`;

            // 1. Try to load from cache
            try {
                const cachedData = localStorage.getItem(cacheKey);
                if (cachedData) {
                    console.log(`Using cached verse for ${versionParam}`);
                    setVerse(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.warn('Failed to read from cache', e);
            }

            // 2. Fetch from API if not in cache
            try {
                const response = await fetch(`https://beta.ourmanna.com/api/v1/get?format=json&order=daily&version=${versionParam}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const verseDetails = data.verse.details;

                // 3. Save to cache
                setVerse(verseDetails);
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(verseDetails));

                    // 4. Cleanup old keys (simple strategy: remove anything not matching today)
                    Object.keys(localStorage).forEach(key => {
                        if (key.startsWith('daily_bread_') && key !== cacheKey) {
                            // Verify if it's a different version for today, keep it. 
                            // If it's a different DATE, remove it.
                            if (!key.endsWith(todayNum)) {
                                localStorage.removeItem(key);
                            }
                        }
                    });
                } catch (e) {
                    console.warn('Failed to save to cache', e);
                }

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
