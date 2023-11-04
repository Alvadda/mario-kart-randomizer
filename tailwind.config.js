/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                main: "url('https://i.pinimg.com/originals/8f/4a/0d/8f4a0da99d0da4c4fffe670edcad17b7.jpg')",
            },
            fontFamily: {
                poppins: ['"Poppins"', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
}
