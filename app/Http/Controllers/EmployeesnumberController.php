<?php
namespace App\Http\Controllers;

use App\Employeesnumber;
use Illuminate\Http\Request;

class EmployeesnumberController extends Controller{
    //ENG: This function is find all the employees numbers' categories in the database and return them.
    //HUN: Ez a funkció megtalálja az összes dolgozók száma kategóriát az adatbázisban és visszaadja azokat.
    public function getEmployeesnumbers(){
        $employeesnumbers = Employeesnumber::all();
        $response = [
            'employeesnumbers' => $employeesnumbers
        ];
        return response()->json($response, 200);
    }
}