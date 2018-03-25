<?php
namespace App\Http\Controllers;

use App\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller{
    //ENG: This function is find all the currencies in the database and return them.
    //HUN: Ez a funkció megtalálja az összes pénznemet az adatbázisban és visszaadja azokat.
    public function getCurrencies(){
        $currencies = Currency::all();
        $response = [
            'currencies' => $currencies
        ];
        return response()->json($response, 200);
    }
}