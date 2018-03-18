<?php
namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller{
    public function postCompany(Request $request){
        $company = new Company();
        $company->name = $request->input('name');
        $company->logo = $request->input('logo');
        $company->phone = $request->input('phone');
        $company->email = $request->input('email');
        $company->website = $request->input('website');
        $company->facebook = $request->input('facebook');
        $company->taxnumber = $request->input('taxnumber');
        $company->headquarter = json_encode($request->input('headquarter'));
        $company->billing_address = json_encode($request->input('billing_address'));
        $company->mail_address = json_encode($request->input('mail_address'));
        $company->industry_id = $request->input('industry_id');
        $company->employeesnumber_id = $request->input('employeesnumber_id');
        $company->yearlyincome_id = $request->input('yearlyincome_id');
        $company->save();
        $company->projects()->sync($request->input('project_id'), false);
        $company->contacts()->sync($request->input('contact_id'), false);
        $projects = $company->projects;
        $contacts = $company->contacts;
        $industry = $company->industry;
        $employeesnumber = $company->employeesnumber;
        $yearlyincome = $company->yearlyincome;
        return response()->json(['company' => $company], 201);
    }

    public function getCompany($id){
        $company = Company::find($id);
        $projects = $company->projects;
        $contacts = $company->contacts;
        $industry = $company->industry;
        $employeesnumber = $company->employeesnumber;
        $yearlyincome = $company->yearlyincome;
        $response = [
            'company' => $company
        ];
        return response()->json($response, 200);
    }

    public function getCompanies(){
        $companies = Company::all();
        foreach ($companies as $company) {
            $projects = $company->projects;
        }
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
        $company->logo = $request->input('logo');
        $company->phone = $request->input('phone');
        $company->email = $request->input('email');
        $company->website = $request->input('website');
        $company->facebook = $request->input('facebook');
        $company->taxnumber = $request->input('taxnumber');
        $company->headquarter = json_encode($request->input('headquarter'));
        $company->billing_address = json_encode($request->input('billing_address'));
        $company->mail_address = json_encode($request->input('mail_address'));
        $company->industry_id = $request->input('industry_id');
        $company->employeesnumber_id = $request->input('employeesnumber_id');
        $company->yearlyincome_id = $request->input('yearlyincome_id');
        $company->save();
        $company->projects()->sync($request->input('project_id'));
        $company->contacts()->sync($request->input('contact_id'));
        $projects = $company->projects;
        $contacts = $company->contacts;
        $industry = $company->industry;
        $employeesnumber = $company->employeesnumber;
        $yearlyincome = $company->yearlyincome;
        return response()->json(['company' => $company], 200);
    }

    public function deleteCompany($id){
        $company = Company::find($id);
        $company->projects()->detach();
        $company->contacts()->detach();
        $company->delete();
        return response()->json(['message' => 'Company deleted!'], 200);
    }
}