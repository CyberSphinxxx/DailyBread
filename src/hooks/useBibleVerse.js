import { useState, useEffect, useCallback } from 'react';
import { fallbackVerses } from '../data/fallbackVerses';

export function useBibleVerse() {
    const [verse, setVerse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVerse = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://beta.ourmanna.com/api/v1/get?format=json&order=daily');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setVerse(data.verse.details);
        } catch (err) {
            console.warn('Failed to fetch verse, using fallback:', err);
            setError(err);
            // Pick a random fallback verse
            const randomIndex = Math.floor(Math.random() * fallbackVerses.length);
            setVerse(fallbackVerses[randomIndex].verse.details);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVerse();
    }, [fetchVerse]);

    return { verse, loading, error, refetch: fetchVerse };
}
