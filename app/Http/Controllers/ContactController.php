<?php
namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller{
    public function postContact(Request $request){
        $contact = new Contact();
        $contact->full_name = $request->input('full_name');
        $contact->surname = $request->input('surname');
        $contact->middle_name = $request->input('middle_name');
        $contact->forename = $request->input('forename');
        $contact->nickname = $request->input('nickname');
        $contact->phone = $request->input('phone');
        $contact->email = $request->input('email');
        $contact->save();
        $contact->companies()->sync($request->input('company_id'), false);
        $contact->projects()->sync($request->input('project_id'), false);
        $companies = $contact->companies;
        $projects = $contact->projects;
        return response()->json(['contact' => $contact], 201);
    }

    public function getContact($id){
        $contact = Contact::find($id);
        $companies = $contact->companies;
        $projects = $contact->projects;
        $response = [
            'contact' => $contact
        ];
        return response()->json($response, 200);
    }

    public function getContacts(){
        $contacts = Contact::all();
        $response = [
            'contacts' => $contacts
        ];
        return response()->json($response, 200);
    }

    public function putContact(Request $request, $id){
        $contact = Contact::find($id);
        if(!$contact){
            return response()->json(['message' => 'Document not found'], 404);
        }
        $contact->full_name = $request->input('full_name');
        $contact->surname = $request->input('surname');
        $contact->middle_name = $request->input('middle_name');
        $contact->forename = $request->input('forename');
        $contact->nickname = $request->input('nickname');
        $contact->phone = $request->input('phone');
        $contact->email = $request->input('email');
        $contact->save();
        $contact->companies()->sync($request->input('company_id'));
        $contact->projects()->sync($request->input('project_id'));
        $companies = $contact->companies;
        $projects = $contact->projects;
        return response()->json(['contact' => $contact], 200);
    }

    public function deleteContact($id){
        $contact = Contact::find($id);
        $contact->companies()->detach();
        $contact->projects()->detach();
        $contact->delete();
        return response()->json(['message' => 'Contact deleted!'], 200);
    }
}