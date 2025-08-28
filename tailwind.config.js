/** @type {import('tailwindcss').Config} */
import { customColors } from './src/theme/theme.jsx';

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: customColors.primary,
                secondary: customColors.secondary,
                background: customColors.background,
                'background-paper': customColors.backgroundPaper,
                text: customColors.textPrimary,
                'text-secondary': customColors.textSecondary,
                divider: customColors.divider,
                dark: "#222224",
            },
            screens: {
                '2xl': '1440px',
                '3xl': '2560px',
                '4xl': '3860px',
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
            },
            spacing: {
                px: '1px',
                ...Array.from({ length: 40 }).reduce((acc, _, i) => {
                    acc[i] = `${i * 0.25}rem`;
                    return acc;
                }, {}),
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
