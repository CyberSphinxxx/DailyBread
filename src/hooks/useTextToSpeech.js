import { useState, useEffect, useCallback } from 'react';

export function useTextToSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [hasSupport, setHasSupport] = useState(false);
    const [voice, setVoice] = useState(null);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            setHasSupport(true);

            const loadVoices = () => {
                const voices = window.speechSynthesis.getVoices();
                // Prefer a "soft" female voice or US English
                const preferredVoice = voices.find(v =>
                    v.name.includes('Google US English') ||
                    v.name.includes('Microsoft Zira') ||
                    (v.lang === 'en-US' && v.name.includes('Female'))
                ) || voices.find(v => v.lang === 'en-US') || voices[0];

                setVoice(preferredVoice);
            };

            loadVoices();

            // Chrome loads voices asynchronously
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const speak = useCallback((text) => {
        if (!hasSupport) return;

        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        if (voice) utterance.voice = voice;

        // Adjust for a softer tone
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [hasSupport, voice]);

    const cancel = useCallback(() => {
        if (!hasSupport) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, [hasSupport]);

    // key cleanup when unmounting
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return { speak, cancel, isSpeaking, hasSupport };
}
