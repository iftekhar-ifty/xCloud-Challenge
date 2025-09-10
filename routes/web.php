<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {

    return view('welcome');
});
Route::get('/dd', [\App\Http\Controllers\Apis\ServerController::class, 'index']);
