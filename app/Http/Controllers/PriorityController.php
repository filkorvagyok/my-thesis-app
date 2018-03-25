<?php
namespace App\Http\Controllers;

use App\Priority;
use Illuminate\Http\Request;

class PriorityController extends Controller{
    //ENG: This function is find all the priorities in the database and return them.
    //HUN: Ez a funkció megtalálja az összes iparágat az adatbázisban és visszaadja azokat.
    public function getPriorities(){
        $priorities = Priority::all();
        $response = [
            'priorities' => $priorities
        ];
        return response()->json($response, 200);
    }
}