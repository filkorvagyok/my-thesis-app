<?php
namespace App\Http\Controllers;

use App\Status;
use Illuminate\Http\Request;

class StatusController extends Controller{
    //ENG: This function is find all the statuses in the database and return them.
    //HUN: Ez a funkció megtalálja az összes iparágat az adatbázisban és visszaadja azokat.
    public function getCompanies(){
        $statuses = Status::all();
        $response = [
            'statuses' => $statuses
        ];
        return response()->json($response, 200);
    }
}