/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1E3A8A',
                secondary: '#3B82F6',
                success: '#22C55E',
                warning: '#F59E0B',
                danger: '#EF4444',
                background: '#F8FAFC',
            },
        },
    },
    plugins: [],
}
