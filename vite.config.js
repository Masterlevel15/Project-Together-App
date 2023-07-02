import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            ssr: 'resources/js/ssr.js',
            refresh: true,
            include: ['resources/css/app.css'], // Ajoutez cette ligne pour inclure le fichier CSS
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
                compilerOptions: {
                    isCustomElement: (tag) => tag === 'DatePickerVue' || tag === 'FlatPickr'
                },
            },
        }),
    ],
    build: {
        rollupOptions: {
            external: ['glob'],
        },
        assetsDir: '', // Remplacez par le chemin HTTPS approprié
        // ... autres options de construction
      },
    resolve: {
        alias: {
            '@': '/resources/js'
        }
    }
});
