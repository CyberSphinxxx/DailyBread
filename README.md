# Daily Bread 🍞

> *"Give us this day our daily bread."*

**Daily Bread** is a serene, premium digital devotional designed to provide a single moment of reflection each day. Unlike typical Bible apps with endless scrolling, Daily Bread strictly offers **one verse per day**, encouraging deep meditation rather than consumption.

<img width="1836" height="949" alt="image" src="https://github.com/user-attachments/assets/46104649-4b02-4a01-b9cd-51ff52e31c2e" />

---

## 📖 For The Reader (Non-Programmers)

Welcome! This application was built with a specific philosophy in mind: **Digital Manna**. Just as the manna in the wilderness was given for one day only, this site provides one verse for you to carry through your day.

### How It Works
1.  **One Verse, 24 Hours**: The verse updates automatically every day. There is no "next" button. We invite you to sit with the text, read it aloud, or memorize it.
2.  **Listen**: Click the **Speaker Icon** in the bottom floating bar to have the verse read aloud to you.
3.  **Collect**: Something speak to you? Click the **Heart Icon** to save it to your personal collection. You can access your collection anytime by clicking the bookmark icon in the top right.
4.  **Share**: Want to send today's verse to a friend? Click the **Share Icon** to copy the text or open your device's sharing menu.
5.  **Context**: Want to read more? Click the **Book Icon** to open the full chapter on BibleGateway.

### The "Preparation" Message
If you see a message saying *"The Daily Bread is being prepared"*, it means you are offline or the daily verse is refreshing. Please check your internet connection or try again in a few minutes.

---

## 🛠️ For Developers

Daily Bread is a modern Single Page Application (SPA) built with performance, accessibility, and aesthetics in mind.

### Tech Stack
-   **Core**: React 18, Vite
-   **Styling**: Tailwind CSS (with custom animations and typography)
-   **Icons**: Lucide React
-   **Utilities**: `date-fns` for time management
-   **Sate & Storage**: LocalStorage for caching and persistence

### Getting Started

Prerequisites: Node.js (v16+)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YourUsername/DailyBread.git
    cd DailyBread
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

### Key Features (Technical)

*   **Smart Caching**: To prevent hitting API rate limits, verses are cached in `localStorage` for 24 hours. The app checks cache validity before making a network request.
*   **Offline First**: The app gracefully handles network failures with custom error UI.
*   **Text-to-Speech (TTS)**: Uses the native `window.speechSynthesis` API for broad compatibility without external heavy libraries.
*   **Micro-Interactions**:
    *   Custom `selection` colors.
    *   Dynamic document title (`useEffect`).
    *   Portal-based Toast notifications.
    *   Ambient background animations (`animate-blob`).
*   **Responsive**: Fully responsive "Editorial" layout that shifts from mobile-first column to desktop spread.

---

### Project Structure

```
src/
├── components/      # UI Components (VerseCard, Controls, Layout...)
├── hooks/           # Custom Hooks (useBibleVerse, useTextToSpeech)
├── App.jsx          # Main Application Logic & State
└── main.jsx         # Entry Point
```

Created by **John Lemar Gonzales**.
