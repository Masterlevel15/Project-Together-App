<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/sort-activities', [App\Http\Controllers\ActivityController::class, 'sortActivitiesWithDistances']);

Route::get('/activities', [App\Http\Controllers\ActivityController::class, 'getActivities']);

Route::get('/search-activities/{locality}', [App\Http\Controllers\ActivityController::class, 'searchActivities']);

Route::post('/activity-filter', [App\Http\Controllers\ActivityController::class, 'searchActivitiesByFilter']);

Route::post('/activity/store', [App\Http\Controllers\ActivityController::class, 'store']);

Route::group(['prefix' => 'api'], function () {
    // Vos routes API ici
});