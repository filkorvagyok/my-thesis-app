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
    'uses' => 'CompanyController@postCompany',
    'middleware' => 'jwt.auth'
]);

Route::get('/company/{id}', [
    'uses' => 'CompanyController@getCompany',
    'middleware' => 'jwt.auth'
]);

Route::get('/companies', [
    'uses' => 'CompanyController@getCompanies',
    'middleware' => 'jwt.auth'
]);

Route::put('/company/{id}', [
    'uses' => 'CompanyController@putCompany',
    'middleware' => 'jwt.auth'
]);

Route::delete('/company/{id}', [
    'uses' => 'CompanyController@deleteCompany',
    'middleware' => 'jwt.auth'
]);

Route::post('/project', [
    'uses' => 'ProjectController@postProject',
    'middleware' => 'jwt.auth'
]);

Route::get('/project/{id}', [
    'uses' => 'ProjectController@getProject',
    'middleware' => 'jwt.auth'
]);

Route::get('/projects', [
    'uses' => 'ProjectController@getProjects',
    'middleware' => 'jwt.auth'
]);

Route::put('/project/{id}', [
    'uses' => 'ProjectController@putProject',
    'middleware' => 'jwt.auth'
]);

Route::delete('/project/{id}', [
    'uses' => 'ProjectController@deleteProject',
    'middleware' => 'jwt.auth'
]);

Route::post('/contact', [
    'uses' => 'ContactController@postContact',
    'middleware' => 'jwt.auth'
]);

Route::get('/contact/{id}', [
    'uses' => 'ContactController@getContact',
    'middleware' => 'jwt.auth'
]);

Route::get('/contacts', [
    'uses' => 'ContactController@getContacts',
    'middleware' => 'jwt.auth'
]);

Route::put('/contact/{id}', [
    'uses' => 'ContactController@putContact',
    'middleware' => 'jwt.auth'
]);

Route::delete('/contact/{id}', [
    'uses' => 'ContactController@deleteContact',
    'middleware' => 'jwt.auth'
]);