<?php
namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller{
    public function postCompany(Request $request){
        $company = new Company();
        $company->name = $request->input('name');
        $company->phone = $request->input('phone');
        $company->email = $request->input('email');
        $company->save();
        return response()->json(['company' => $company], 201);
    }

    public function getCompanies(){
        $companies = Company::all();
        $response = [
            'companies' => $companies
        ];
        return response()->json($response, 200);
    }

    public function putCompany(Request $request, $id){
        $company = Company::find($id);
        if(!$company){
            return response()->json(['message' => 'Document not found'], 404);
        }
        $company->name = $request->input('name');
        $company->phone = $request->input('phone');
        $company->email = $request->input('email');
        $company->save();
        return response()->json(['company' => $company], 200);
    }

    public function deleteCompany($id){
        $company = Company::find($id);
        $company->delete();
        return response()->json(['message' => 'Company deleted!'], 200);
    }
}