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
use App\Http\Controllers\ScheduleController;
>>>>>>> 65e1852c9ac75c7c84f23c024e9a3fb564d00266

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
<<<<<<< HEAD
    //Route::post('/admissionform', [AdmissionFormController::class, 'store']);
    Route::get('/admissionform', [AdmissionFormController::class, 'index']);
    Route::post('/admission_forms', [AdmissionFormController::class, 'store']);

//     Route::group(['prefix' => 'admission_forms'], function () {
//     Route::get('/', [AdmissionFormController::class, 'index']);
//     Route::post('/', [AdmissionFormController::class, 'store']);
//     Route::get('/{id}', [AdmissionFormController::class, 'show']);
//     Route::put('/{id}', [AdmissionFormController::class, 'update']);
//     Route::delete('/{id}', [AdmissionFormController::class, 'destroy']);
// });

=======

    Route::resource('scheduling', ScheduleController::class);
>>>>>>> 65e1852c9ac75c7c84f23c024e9a3fb564d00266
});

