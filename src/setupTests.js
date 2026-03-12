// src/setupTests.js
import "@testing-library/jest-dom";

// Vitest / jsdom polyfill pentru matchMedia
if (typeof window !== "undefined") {
    window.matchMedia = window.matchMedia || function (query) {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: () => { }, // deprecated
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => false,
        };
    };
}