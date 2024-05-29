<?php

use App\Http\Controllers\AdmissionFormController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
<<<<<<< HEAD
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
=======
use App\Http\Controllers\StoreController;
use App\Http\Controllers\StudentController;
=========
use App\Http\Controllers\ScheduleController;
>>>>>>>>> Temporary merge branch 2

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

Route::get('/ping', function () {
    return 'ping test';
});
Route::post('/login', [AuthController::class, 'login']);


Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::prefix('auth')
        ->controller(AuthController::class)
        ->group(function () {
            Route::post('/logout', 'logout');
            Route::get('/', 'user');
        });

        Route::group(['middleware' => ['restrictRole:admin'], 'prefix' => 'admin'], function () {
            Route::resource('users', UserController::class)->only(['index','store', 'destroy']);
            
        });
        
                                 
    Route::prefix('messages')
        ->controller(MessageController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{id}', 'show');
            Route::post('/{id}', 'store');
        });
       
    
    Route::get('/categories', [CategoryController::class, 'index']);
<<<<<<<<< Temporary merge branch 1
    Route::post('/admissionform', [StudentController::class, 'store']);
=========
    Route::get('/stores', [StoreController::class, 'index']);

    // Route::prefix('scheduling')
    // ->controller(ScheduleController::class)
    // ->group(function () {
    //     Route::get('/', 'index');
    //     Route::get('/', 'show');
    //     Route::post('/', 'store');
    //     Route::put('/{id}', 'update');
    //     Route::delete('/{id}', 'destroy');
    // });

    Route::resource('scheduling', ScheduleController::class);

>>>>>>>>> Temporary merge branch 2
});