<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OrquideaController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('registro_orquideas', [OrquideaController::class, 'index'])->name('orquideas.index');
    Route::get('registro_orquideas/create', [OrquideaController::class, 'create'])->name('orquideas.create');
    Route::post('registro_orquideas', [OrquideaController::class, 'store'])->name('orquideas.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
