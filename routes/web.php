<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GallonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main gallon distribution interface (public access)
Route::get('/', [GallonController::class, 'index'])->name('home');
Route::post('/employee/lookup', [GallonController::class, 'show'])->name('employee.lookup');
Route::post('/gallon/take', [GallonController::class, 'store'])->name('gallon.take');

// Arduino barcode scan endpoint (public API)
Route::post('/api/scan', [App\Http\Controllers\Api\ScanController::class, 'store'])->name('api.scan');

// Admin routes (require authentication)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Employee management routes
    Route::resource('employees', EmployeeController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
