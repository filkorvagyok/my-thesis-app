<?php
namespace App\Http\Controllers;

use App\Industry;
use Illuminate\Http\Request;

class IndustryController extends Controller{
    //ENG: This function is find all the industries in the database and return them.
    //HUN: Ez a funkció megtalálja az összes iparágat az adatbázisban és visszaadja azokat.
    public function getIndustries(){
        $industries = Industry::all();
        $response = [
            'industries' => $industries
        ];
        return response()->json($response, 200);
    }
}