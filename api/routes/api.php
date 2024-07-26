<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ActivityLogController;

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

    Route::resource('/registration', RegistrationController::class);
    
    Route::get('/stores', [StoreController::class, 'index']);

    Route::middleware('api')->group(function () {
        Route::get('/deleted-schedules', [ScheduleController::class, 'getDeletedSchedules']);
        Route::resource('scheduling', ScheduleController::class);
    });


    
    Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard.show');

    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::patch('/schedules', [ScheduleController::class, 'updateAll']);

    Route::get('activitylogs', [ActivityLogController::class, 'index']);
    Route::get('activitylogs/{id}', [ActivityLogController::class, 'show']);
});