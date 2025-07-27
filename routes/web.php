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
    Route::get('orquideas', [OrquideaController::class, 'index'])->name('orquideas.index');
    Route::get('orquideas/create', [OrquideaController::class, 'create'])->name('orquideas.create');
    Route::post('orquideas', [OrquideaController::class, 'store'])->name('orquideas.store');
    Route::get('orquideas/{orquidea}', [OrquideaController::class, 'show'])->name('orquideas.show');
    Route::get('orquideas/{orquidea}/edit', [OrquideaController::class, 'edit'])->name('orquideas.edit');
    Route::put('orquideas/{orquidea}', [OrquideaController::class, 'update'])->name('orquideas.update');
    Route::delete('orquideas/{orquidea}', [OrquideaController::class, 'destroy'])->name('orquideas.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
