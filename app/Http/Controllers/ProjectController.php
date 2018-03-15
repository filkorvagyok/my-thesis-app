<?php
namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;


class ProjectController extends Controller{
    public function postProject(Request $request){
        $project = new Project();
        $project->name = $request->input('name');
        $project->status = $request->input('status');
        $project->save();
        return response()->json(['project' => $project], 201);
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
        $project->status = $request->input('status');
        $project->save();
        return response()->json(['project' => $project], 200);
    }

    public function deleteProject($id){
        $project = Project::find($id);
        $project->delete();
        return response()->json(['message' => 'Project deleted!'], 200);
    }
}