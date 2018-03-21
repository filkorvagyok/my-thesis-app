<?php
namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;


class ProjectController extends Controller{

    //ENG: If the api takes a project post request, then this function will start. This method set up a new Project from the datas you get from request and connect with companies and contacts.
    //HUN: Ha az api fogad egy project post kérést, akkor ez a funkció hajtódik végre. Készít egy új projektet a kapott adatokkal és ezután összekapcsolja a cégekkel és névjegyekkel.
    public function postProject(Request $request){
        $project = new Project();
        $project = $this->setProject($project, $request);
        $project->companies()->sync($request->input('company_id'), false);
        $project->contacts()->sync($request->input('contact_id'), false);
        $companies = $project->companies;
        $contacts = $project->contacts;
        $status = $project->status;
        $priority = $project->priority;
        $currency = $project->currency;
        return response()->json(['project' => $project], 201);
    }

    //ENG: This funtion is find the project with the id and return it with some more informations.
    //HUN: Ez a funkció megtalálja a projektet az id alapján és visszaadja json formátumban néhány plusz információval.
    public function getProject($id){
        $project = Project::find($id);
        $companies = $project->companies;
        $contacts = $project->contacts;
        $status = $project->status;
        $priority = $project->priority;
        $currency = $project->currency;
        $response = [
            'project' => $project
        ];
        return response()->json($response, 200);
    }

    //ENG: This function is find all the projects in the database and return it with some informations.
    //HUN: Ez a funkció megtalálja az összes projektet az adatbázisban és visszaadja néhány plusz információval.
    public function getProjects(){
        $projects = Project::all();
        $response = [
            'projects' => $projects
        ];
        return response()->json($response, 200);
    }

    //ENG: With the id, it takes find the needed project and with the datas you get from the request, it change some datas in the project.
    //HUN: Az id segítségével megtalálja a szükséges projektet, majd a kérésben található adatok felhasználásával módosít rajta.
    public function putProject(Request $request, $id){
        $project = Project::find($id);
        if(!$project){
            return response()->json(['message' => 'Document not found'], 404);
        }
        $project = $this->setProject($project, $request);
        $project->companies()->sync($request->input('company_id'));
        $project->contacts()->sync($request->input('contact_id'));
        $companies = $project->companies;
        $contacts = $project->contacts;
        $status = $project->status;
        $priority = $project->priority;
        $currency = $project->currency;
        return response()->json(['project' => $project], 200);
    }

    //ENG: This method is find the project with the id and delete it form connected tables and from the projects table.
    //HUN: Ez a metódus az id alapján megtalálja a projektet és kitörli a kapcsolt táblákból majd magából a projects táblából is.
    public function deleteProject($id){
        $project = Project::find($id);
        $project->companies()->detach();
        $project->contacts()->detach();
        $project->delete();
        return response()->json(['message' => 'Project deleted!'], 200);
    }

    //ENG: This is an assistant method which help for post and put method to set the project's field from the requested datas.
    //: Ez egy segédfunkció, ami segít a post és put metódusoknak beállítani a projekt mezőit a kapott adatok alapján.
    private function setProject(Project $project, Request $request){
        $project->name = $request->input('name');
        $project->description = $request->input('description');
        $project->file = $request->input('file');
        $project->deadline = $request->input('deadline');
        $project->status_id = $request->input('status_id');
        $project->priority_id = $request->input('priority_id');
        $project->currency_id = $request->input('currency_id');
        $project->income = $request->input('income');
        $project->expenditure = $request->input('expenditure');
        $project->save();
        return $project;
    }
}