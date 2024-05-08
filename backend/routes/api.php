<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });




Route::get('categories', [CategoryController::class, 'index']);
Route::post('category/create', [CategoryController::class, 'store']);
Route::get('category/edit/{id}', [CategoryController::class, 'edit']);
Route::post('category/update/{id}', [CategoryController::class, 'update']);
Route::post('category/delete/{id}', [CategoryController::class, 'destroy']);


Route::get('projects', [ProjectController::class, 'index']);
Route::post('project/create', [ProjectController::class, 'store']);
Route::get('project/edit/{id}', [ProjectController::class, 'edit']);
Route::post('project/update/{id}', [ProjectController::class, 'update']);
Route::post('project/delete/{id}', [ProjectController::class, 'destroy']);



Route::get('posts', [PostController::class, 'index']);
Route::get('seo-posts', [PostController::class, 'seo_posts']);
Route::post('post/create', [PostController::class, 'store']);
Route::get('post/edit/{id}', [PostController::class, 'edit']);
Route::post('post/update/{id}', [PostController::class, 'update']);
Route::post('post/delete/{id}', [PostController::class, 'destroy']);
Route::get('latest-posts', [PostController::class, 'latestposts']);
Route::get('all-posts', [PostController::class, 'allposts']);
Route::get('postview/{slug}', [PostController::class, 'postview']);


Route::post('new-message', [MessageController::class, 'store']);
Route::get('messages', [MessageController::class, 'index']);
Route::post('message/delete/{id}', [MessageController::class, 'destroy']);