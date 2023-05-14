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
        'test' => App\Models\Activity::all(),'activities' => App\Models\Activity::select("*", "activities.title as activityTitle","users.name as userName", "activities.id as activityID", "users.id as userID", "cities.name as cityName", "users.city_id as userCityID", "activities.city_id as activityCityID", "activities.country_id as activityCountryID", "users.country_id as userCountryID", "countries.name as activityCountryName", "categories.name as activityCategoryName")->join("users", "activities.promoter_id", "=", "users.id")->join("cities", "activities.city_id", "=", "cities.id")->join("countries", "countries.id", "=", "activities.country_id")->join("categories", "categories.id", "=", "activities.category_id")->get()
    ]);
});

//Route détails d'une activité
Route::get('/activity/{id}', [\App\Http\Controllers\ActivityController::class, 'show'])->name('activity.show');

// Route de création d'une activité
Route::get('/create', function () {
    return Inertia::render('Activity/ActivityForm',[
        'categories' => App\Models\Category::all(),
    ]);
})->name('activity.create');

// Route::inertia('/create', 'Activity/ActivityForm')->name('activity.create');

/*
Route::get('/App', function () {
    return Inertia::render('App', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
]);
});
*/

// Route::get('/test', 'App\Http\Controllers\LocationController@test');


/*
Route::get('/location', function () {
    return Inertia::render('App');
});
*/

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
        ]);
    })->name('dashboard');
});
