/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primaryDark: '#000000',
                primaryLight: '#FFFFFF',
            },
        },
    },
    plugins: [],
}