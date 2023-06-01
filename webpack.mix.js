const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/build/app.css')
   .postCss('resources/css/app.css', 'public/build/app.js', [
      require('postcss-import'),
      // Autres plugins postCSS nécessaires
   ])
   .version();
