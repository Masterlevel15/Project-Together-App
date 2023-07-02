const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            colors: {
                'blue-lagon': '#EBF4F5',
                'blue-light': '#7BBFBF',
                'blue-light2': '#B4D9D9',
                'blue-light3': '#CEE7E7',
                'blue-dark': '#5299BC',
                'blue-dark2': '#4B8799',
                'blue-gray': '#4C8798',
                'blue-card-background': '#4D8798',
                'blue-input-form': '#D1E7E8',
                'green': '#00CA8A',
                'green2':'#03CB8B',
                'bandelette-details': '#4C8798',
                
                
                
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
