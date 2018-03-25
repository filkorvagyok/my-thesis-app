<?php
namespace App\Http\Controllers;

use App\Yearlyincome;
use Illuminate\Http\Request;

class YearlyincomeController extends Controller{
    //ENG: This function is find all the yearlyincomes in the database and return them.
    //HUN: Ez a funkció megtalálja az összes iparágat az adatbázisban és visszaadja azokat.
    public function getYearlyincomes(){
        $yearlyincomes = Yearlyincome::all();
        $response = [
            'yearlyincomes' => $yearlyincomes
        ];
        return response()->json($response, 200);
    }
}