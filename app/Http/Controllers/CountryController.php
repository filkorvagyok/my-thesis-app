<?php
namespace App\Http\Controllers;

use App\Country;
use Illuminate\Http\Request;

class CountryController extends Controller{
    //ENG: This function is find all the countries in the database and return them.
    //HUN: Ez a funkció megtalálja az összes országot az adatbázisban és visszaadja azokat.
    public function getCountries(){
        $countries = Country::all();
        $response = [
            'countries' => $countries
        ];
        return response()->json($response, 200);
    }
}