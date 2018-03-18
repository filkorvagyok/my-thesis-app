<?php
namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;


class ProjectController extends Controller{
    public function postProject(Request $request){
        $project = new Project();
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
        $project->companies()->sync($request->input('company_id'), false);
        $project->contacts()->sync($request->input('contact_id'), false);
        $companies = $project->companies;
        $contacts = $project->contacts;
        $status = $project->status;
        $priority = $project->priority;
        $currency = $project->currency;
        return response()->json(['project' => $project], 201);
    }

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

    public function getProjects(){
        $projects = Project::all();
        $response = [
            'projects' => $projects
        ];
        return response()->json($response, 200);
    }

    public function putProject(Request $request, $id){
        $project = Project::find($id);
        if(!$project){
            return response()->json(['message' => 'Document not found'], 404);
        }
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
        $project->companies()->sync($request->input('company_id'));
        $project->contacts()->sync($request->input('contact_id'));
        $companies = $project->companies;
        $contacts = $project->contacts;
        $status = $project->status;
        $priority = $project->priority;
        $currency = $project->currency;
        return response()->json(['project' => $project], 200);
    }

    public function deleteProject($id){
        $project = Project::find($id);
        $project->companies()->detach();
        $project->contacts()->detach();
        $project->delete();
        return response()->json(['message' => 'Project deleted!'], 200);
    }
}