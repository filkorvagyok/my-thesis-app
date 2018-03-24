<?php
namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller{

    //ENG: If the api takes a contact post request, then this function will start. This method set up a new Contact from the datas you get from request and connect with companies and projects.
    //HUN: Ha az api fogad egy company post kérést, akkor ez a funkció hajtódik végre. Készít egy új névjegyet a kapott adatokkal és ezután összekapcsolja a cégekkel és projektekkel.
    public function postContact(Request $request){
        $contact = new Contact();
        $contact = $this->setContact($contact, $request);
        $contact->companies()->sync($request->input('company_id'), false);
        $contact->projects()->sync($request->input('project_id'), false);
        $companies = $contact->companies;
        $projects = $contact->projects;
        return response()->json(['contact' => $contact], 201);
    }

    //ENG: This funtion is find the contact with the id and return it with some more informations.
    //HUN: Ez a funkció megtalálja a névjegyet az id alapján és visszaadja json formátumban néhány plusz információval.
    public function getContact($id){
        $contact = Contact::find($id);
        $companies = $contact->companies;
        $projects = $contact->projects;
        $response = [
            'contact' => $contact
        ];
        return response()->json($response, 200);
    }

    //ENG: This function is find all the contacts in the database and return it with some informations.
    //HUN: Ez a funkció megtalálja az összes névjegyet az adatbázisban és visszaadja néhány plusz információval.
    public function getContacts(){
        $contacts = Contact::all();
        foreach($contacts as $contact){
            $companies = $contact->companies;
            $projects = $contact->projects;
        }
        $response = [
            'contacts' => $contacts
        ];
        return response()->json($response, 200);
    }

    //ENG: With the id, it takes find the needed contact and with the datas you get from the request, it change some datas in the contact.
    //HUN: Az id segítségével megtalálja a szükséges névjegyet, majd a kérésben található adatok felhasználásával módosít rajta.
    public function putContact(Request $request, $id){
        $contact = Contact::find($id);
        if(!$contact){
            return response()->json(['message' => 'Document not found'], 404);
        }
        $contact = $this->setContact($contact, $request);
        $contact->companies()->sync($request->input('company_id'));
        $contact->projects()->sync($request->input('project_id'));
        $companies = $contact->companies;
        $projects = $contact->projects;
        return response()->json(['contact' => $contact], 200);
    }

    //ENG: This method is find the contact with the id and delete it form connected tables and from the contacts table.
    //HUN: Ez a metódus az id alapján megtalálja a névjegyet és kitörli a kapcsolt táblákból majd magából a contacts táblából is.
    public function deleteContact($id){
        $contact = Contact::find($id);
        $contact->companies()->detach();
        $contact->projects()->detach();
        $contact->delete();
        return response()->json(['message' => 'Contact deleted!'], 200);
    }

    //ENG: This is an assistant method which help for post and put method to set the contact's field from the requested datas.
    //: Ez egy segédfunkció, ami segít a post és put metódusoknak beállítani a névjegy mezőit a kapott adatok alapján.
    private function setContact(Contact $contact, Request $request){
        $contact->full_name = $request->input('full_name');
        $contact->surname = $request->input('surname');
        $contact->middle_name = $request->input('middle_name');
        $contact->forename = $request->input('forename');
        $contact->nickname = $request->input('nickname');
        $contact->phone = $request->input('phone');
        $contact->email = $request->input('email');
        $contact->save();
        return $contact;
    }
}