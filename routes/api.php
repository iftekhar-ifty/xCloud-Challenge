<?php

use App\Http\Controllers\Apis\ServerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::controller(ServerController::class)->group(function () {
            Route::get('/servers', 'index');
            Route::post('/store', 'store');
            Route::get('/find/{id}', 'show');
            Route::put('/update/{id}', 'update');
            Route::delete('/delete/{id}', 'destroy');
        });
    });
