<?php

use App\Http\Controllers\Admin\ServerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', [ServerController::class, 'index']);


Route::prefix('server')->group(function () {
    Route::get('show/{id}', [ServerController::class, 'show']);
    Route::post('store', [ServerController::class, 'store']);
    Route::put('update/{id}', [ServerController::class, 'update']);
    Route::delete('delete/{id}', [ServerController::class, 'destroy']);
});

