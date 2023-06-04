const { vue } = require('laravel-mix');
const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/build/app.js')
   .postCss('resources/css/app.css', 'public/build/app.css', [
      require('postcss-import'),
      // Autres plugins postCSS nécessaires
   ])
   .version();
