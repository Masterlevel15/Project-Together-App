<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route principale
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'categories' => App\Models\Category::all(),
        'activities' => App\Models\Activity::pluck('id', 'title'),
    ]);
})->name('home');

//Route détails d'une activité
Route::get('/activity/{id}', [\App\Http\Controllers\ActivityController::class, 'show'])->name('activity.show');

// Route de création d'une activité vers le formulaire
Route::get('/create', function () {
    return Inertia::render('Activity/ActivityForm',[
        'categories' => App\Models\Category::all(),
    ]);
})->name('activity.create');

// Route de création d'une activité vers l'action d'ajout à la DB
Route::get('/store', [\App\Http\Controllers\ActivityController::class, 'store'])->name('activity.store');

//Route Activity par catégorie
Route::get('/activity/category/{id}', [\App\Http\Controllers\ActivityController::class, 'findActivitiesByCategory'])
->name('activity.activitiesByCategory');

//Route Activités par recherche
Route::get('/activity/search/{search}', function () {
    return Inertia::render('Activity/ActivityBySetting', [
        'title' => 'recherche',
    ]);
})->name('activity.activitiesBySearch');

//Route des activités enregistre par l'utilisateurz
Route::get('/user/activity/bookmarks', [\App\Http\Controllers\ActivityController::class, 'findActivitiesBookmarkByUser'])->name('user.bookmarks');

//Route vers la map avec les activités
Route::get('/map', function () {
    return Inertia::render('Activity/ActivitiesMap');
})->name('activity.map');

//Route Easter Egg
//Route des activités enregistre par l'utilisateur
Route::get('/easter-egg', function () {
    return Inertia::render('EasterEgg/DonutAnimation');
})->name('easter.egg');

// Route lorsque l'utilisateur est connecté
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'categories' => App\Models\Category::all(),
            'activities' => App\Models\Activity::pluck('id', 'title'),
        ]);
    })->name('dashboard');
});

