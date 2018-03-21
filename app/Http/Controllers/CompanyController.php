<?php
namespace App\Http\Controllers;

use App\Company;
use App\Addresstype;
use App\Address;
use Illuminate\Http\Request;

class CompanyController extends Controller{

    //ENG: If the api takes a company post request, then this function will start. This method set up a new Company with Addresstype and Address from the datas you get from request and connect with projects and contacts.
    //HUN: Ha az api fogad egy company post kérést, akkor ez a funkció hajtódik végre. Készít egy új céget, címtípust és címet a kapott adatokkal és ezután összekapcsolja a céget a projektekkel és névjegyekkel.
    public function postCompany(Request $request){
        $company = new Company();
        $company = $this->setCompany($company, $request);
        $hq = new Address();
        $hq = $this->setHeadquarter($hq, $request);
        $hqtype = new Addresstype();
        $hqtype->company_id = $company->id;
        $hqtype->address_id = $hq->id;
        $hqtype->address_type = 'headquarter';
        $hqtype->save();
        if($request->input('bi_zipcode') || $request->input('bi_settlement') || $request->input('bi_address'))
        {
            $this->setBillingAddress(null, $request, $company);
        }
        if($request->input('mail_zipcode') || $request->input('mail_settlement') || $request->input('mail_address'))
        {
            $this->setMailAddress(null, $request, $company);
        }
        $company->projects()->sync($request->input('project_id'), false);
        $company->contacts()->sync($request->input('contact_id'), false);
        $projects = $company->projects;
        $contacts = $company->contacts;
        $industry = $company->industry;
        $employeesnumber = $company->employeesnumber;
        $yearlyincome = $company->yearlyincome;
        return response()->json(['company' => $company, 'hq' => $hq], 201);
    }

    //ENG: This funtion is find the company with the id and return it with some more informations.
    //HUN: Ez a funkció megtalálja a céget az id alapján és visszaadja json formátumban néhány plusz információval.
    public function getCompany($id){
        $company = Company::find($id);
        $addresstypes = $company->addresstype;
        foreach($addresstypes as $addresstype){
            $country = $addresstype->address->country;
        }
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

    //ENG: This function is find all the companies in the database and return it with some informations.
    //HUN: Ez a funkció megtalálja az összes céget az adatbázisban és visszaadja néhány plusz információval.
    public function getCompanies(){
        $companies = Company::all();
        foreach($companies as $company){
            $addresstypes = $company->addresstype;
            foreach($addresstypes as $addresstype){
                $country = $addresstype->address->country;
            }
        }
        $response = [
            'companies' => $companies
        ];
        return response()->json($response, 200);
    }

    //ENG: With the id, it takes find the needed company and with the datas you get from the request, it change some datas in the company or the addresses.
    //HUN: Az id segítségével megtalálja a szükséges céget, majd a kérésben található adatok felhasználásával módosít a cég adatain vagy a címek adatain.
    public function putCompany(Request $request, $id){
        $company = Company::find($id);
        $hq = null;
        $bi = null;
        $mail = null;
        $addresstypes = $company->addresstype;
        foreach($addresstypes as $addresstype)
        {
            if($addresstype->address_type == 'headquarter')
            {
                $hq = $addresstype->address;
            }
            if($addresstype->address_type == 'billing')
            {
                $bi = $addresstype->address;
            }
            if($addresstype->address_type == 'mail')
            {
                $mail = $addresstype->address;
            }
        }
        if(!$company){
            return response()->json(['message' => 'Document not found'], 404);
        }
        $company = $this->setCompany($company, $request);
        $hq = $this->setHeadquarter($hq, $request);
        if($request->input('bi_zipcode') || $request->input('bi_settlement') || $request->input('bi_address'))
        {
            $this->setBillingAddress($bi, $request, $company);
        }
        else{
            if(isset($bi)){
                foreach($addresstypes as $addresstype)
                {
                    if($addresstype->address_id == $bi->id)
                    {
                        $addresstype->delete();
                    }
                }
                $bi->delete();
            }
        }
        if($request->input('mail_zipcode') || $request->input('mail_settlement') || $request->input('mail_address'))
        {
            $this->setMailAddress($mail, $request, $company);
        }
        else{
            if(isset($mail)){
                foreach($addresstypes as $addresstype)
                {
                    if($addresstype->address_id == $mail->id)
                    {
                        $addresstype->delete();
                    }
                }
                $mail->delete();
            }
        }
        $company->projects()->sync($request->input('project_id'));
        $company->contacts()->sync($request->input('contact_id'));
        $projects = $company->projects;
        $contacts = $company->contacts;
        $industry = $company->industry;
        $employeesnumber = $company->employeesnumber;
        $yearlyincome = $company->yearlyincome;
        return response()->json(['company' => $company], 200);
    }

    //ENG: This method is find the company with the id and delete it form connected tables and from the companies table.
    //HUN: Ez a metódus az id alapján megtalálja a céget és kitörli a kapcsolt táblákból majd magából a companies táblából is.
    public function deleteCompany($id){
        $company = Company::find($id);
        $company->projects()->detach();
        $company->contacts()->detach();
        $addresstypes = $company->addresstype;
        $company->addresstype()->delete();
        foreach($addresstypes as $addresstype)
        {
            $address = $addresstype->address;
            $address->delete();
        }
        $company->delete();
        return response()->json(['message' => 'Company deleted!'], 200);
    }

    //ENG: This is an assistant method which help for post and put method to set the company's field from the requested datas.
    //: Ez egy segédfunkció, ami segít a post és put metódusoknak beállítani a cég mezőit a kapott adatok alapján.
    private function setCompany(Company $company, Request $request){
        $company->name = $request->input('name');
        $company->logo = $request->input('logo');
        $company->phone = $request->input('phone');
        $company->email = $request->input('email');
        $company->website = $request->input('website');
        $company->facebook = $request->input('facebook');
        $company->taxnumber = $request->input('taxnumber');
        $company->industry_id = $request->input('industry_id');
        $company->employeesnumber_id = $request->input('employeesnumber_id');
        $company->yearlyincome_id = $request->input('yearlyincome_id');
        $company->save();
        return $company;
    }

    //ENG: Assistans method, that set the headquarter from the requested datas.
    //HUN: Segédmetódus, ami beállítja a székhelyet a kérés adatai alapján.
    private function setHeadquarter(Address $hq, Request $request){
        $hq->country_id = $request->input('hq_country');
        $hq->zipcode = $request->input('hq_zipcode');
        $hq->settlement = $request->input('hq_settlement');
        $hq->address_line = $request->input('hq_address');
        $hq->save();
        return $hq;
    }

    //ENG: Assistans method, that set the billind address from the requested datas.
    //HUN: Segédmetódus, ami beállítja a számlázási címet a kérés adatai alapján.
    private function setBillingAddress($bi, Request $request, $company){
        if(!isset($bi)){
            $bi = new Address();
            $bi->country_id = $request->input('bi_country');
            $bi->zipcode = $request->input('bi_zipcode');
            $bi->settlement = $request->input('bi_settlement');
            $bi->address_line = $request->input('bi_address');
            $bi->save();
            $bitype = new Addresstype();
            $bitype->company_id = $company->id;
            $bitype->address_id = $bi->id;
            $bitype->address_type = 'billing';
            $bitype->save();
        }
        else{
            $bi->country_id = $request->input('bi_country');
            $bi->zipcode = $request->input('bi_zipcode');
            $bi->settlement = $request->input('bi_settlement');
            $bi->address_line = $request->input('bi_address');
            $bi->save();
        }
    }

    //ENG: Assistans method, that set the mail address from the requested datas.
    //HUN: Segédmetódus, ami beállítja a levelezési címet a kérés adatai alapján.
    private function setMailAddress($mail, Request $request, $company){
        if(!isset($mail)){
            $mail = new Address();
            $mail->country_id = $request->input('mail_country');
            $mail->zipcode = $request->input('mail_zipcode');
            $mail->settlement = $request->input('mail_settlement');
            $mail->address_line = $request->input('mail_address');
            $mail->save();
            $mailtype = new Addresstype();
            $mailtype->company_id = $company->id;
            $mailtype->address_id = $mail->id;
            $mailtype->address_type = 'mail';
            $mailtype->save();
        }
        else{
            $mail->country_id = $request->input('mail_country');
            $mail->zipcode = $request->input('mail_zipcode');
            $mail->settlement = $request->input('mail_settlement');
            $mail->address_line = $request->input('mail_address');
            $mail->save();
        }
    }
}