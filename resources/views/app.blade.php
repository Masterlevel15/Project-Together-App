<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <!-- Scripts -->
        <link href="{{ mix('/build/app.css') }}" rel="stylesheet">
        @routes
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <div>test</div>
        @inertia
        <script src="{{ mix('/build/app.js') }}"></script>
    </body>
</html>