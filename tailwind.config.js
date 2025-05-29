/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6a59ff",
                bg: "#f5f5f5",
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
        },
    },
    plugins: [],
}
