import { useState, useEffect } from 'react';

const CACHE_NAME = 'daily-bread-audio-v1';
// 'Adam' Voice ID (Deep, Narrator voice).
const VOICE_ID = 'pNInz6obpgDQGcFmaJgB';

export function useAudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);

    // Cleanup audio when component unmounts or stops
    useEffect(() => {
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
        };
    }, [currentAudio]);

    const playVerse = async (text, reference) => {
        if (isPlaying || isLoading) {
            if (isPlaying && currentAudio) {
                currentAudio.pause();
                setIsPlaying(false);
            }
            return;
        }
        setIsLoading(true);

        try {
            // 1. CLEAN TEXT: Remove quotes for cleaner speaking
            const textToSpeak = text.replace(/[""]/g, '').trim();
            // Safe encode for filename
            const safeRef = encodeURIComponent(reference);
            const cacheKey = new Request(`/audio/${safeRef}.mp3`);

            // 2. CHECK CACHE
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(cacheKey);

            if (cachedResponse) {
                console.log("Playing from Cache (Free)");
                const blob = await cachedResponse.blob();
                playAudioBlob(blob);
                return;
            }

            // 3. FETCH FROM API (If not in cache)
            console.log("Fetching from ElevenLabs...");
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
                method: 'POST',
                headers: {
                    'xi-api-key': import.meta.env.VITE_ELEVENLABS_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: textToSpeak,
                    model_id: "eleven_monolingual_v1",
                    voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                }),
            });

            if (!response.ok) throw new Error("API Limit or Key Error");

            // 4. SAVE TO CACHE & PLAY
            const blob = await response.blob();
            await cache.put(cacheKey, new Response(blob));
            playAudioBlob(blob);

        } catch (error) {
            console.error("Audio Error:", error);
            fallbackTTS(text); // Safety Net
        } finally {
            setIsLoading(false);
        }
    };

    const playAudioBlob = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        setCurrentAudio(audio);
        setIsPlaying(true);
        audio.play();

        audio.onended = () => {
            setIsPlaying(false);
            URL.revokeObjectURL(url); // Clean up memory
        };
    };

    const fallbackTTS = (text) => {
        console.warn("Using Fallback TTS");
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
    };

    return { playVerse, isPlaying, isLoading };
}
