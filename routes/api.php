<?php

use App\Http\Controllers\Apis\AuthController;
use App\Http\Controllers\Apis\ServerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')
    ->group(function () {
        Route::controller(AuthController::class)->group(function () {
            Route::post('/register', 'register');
            Route::post('/login', 'login');
        });
    });

Route::prefix('v1')
//    ->middleware('auth:sanctum')
    ->group(function () {
        Route::controller(ServerController::class)
            ->prefix('server')
            ->group(function () {
            Route::get('/', 'index');
            Route::post('/store', 'store');
            Route::get('/find/{id}', 'show');
            Route::put('/update/{id}', 'update');
            Route::delete('/delete/{id}', 'destroy');
        });
    });
