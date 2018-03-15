<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/user', [
    'uses' => 'UserController@signup'
]);

Route::post('/user/signin', [
    'uses' => 'UserController@signin'
]);

Route::post('/company', [
    'uses' => 'CompanyController@postCompany'
]);

Route::get('/company', [
    'uses' => 'CompanyController@getCompanies'
]);

Route::put('/company/{id}', [
    'uses' => 'CompanyController@putCompany'
]);

Route::delete('/company/{id}', [
    'uses' => 'CompanyController@deleteCompany'
]);

Route::post('/project', [
    'uses' => 'ProjectController@postProject'
]);

Route::get('/project', [
    'uses' => 'ProjectController@getProject'
]);

Route::put('/project/{id}', [
    'uses' => 'ProjectController@putProject'
]);

Route::delete('/project/{id}', [
    'uses' => 'ProjectController@deleteProject'
]);