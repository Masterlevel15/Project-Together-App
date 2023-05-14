<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request, Inertia\Inertia;;

class LocationController extends Controller
{
    //
    public function test() {
        $data = 'test';
        return Inertia::render('App', [
            'data' => 'test'
        ]);
    }
}
