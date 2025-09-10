<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {

    return inertia('Home');
});


Route::get('/dd', [\App\Http\Controllers\Apis\ServerController::class, 'index']);
