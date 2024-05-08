<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::orderby("created_at", "desc")->paginate(3);
    }

    public function edit($id)
    {
        $project = Project::find($id);

        return $project;
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'desc' => 'required',
            'image' => 'required|image|max:5000',
            'status' => 'required',
            'completed' => 'required',             
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }

        $project = new Project();
        $project->title = $request['title'];
        $project->desc = $request['desc'];
        $project->status = $request['status'];
        $project->completed = $request['completed'];
        $project->link = $request['link'];
        $project->repo = $request['repo'];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalName();
            $filename = time() . '.' . $extension;

            $file->move('uploads/projects/', $filename);

            $project->image = 'uploads/projects/' . $filename;
        }

        $project->save();

        return response()->json([
            'status' => 200,
            'success' => 'new project created successfully',
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'desc' => 'required',
            'image' => 'image|max:5000',
            'status' => 'required',
            'completed' => 'required',          
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }

        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => 404,
            ]);
        }

        $project->title = $request['title'];
        $project->desc = $request['desc'];
        $project->status = $request['status'];
        $project->completed = $request['completed'];
        $project->link = $request['link'];
        $project->repo = $request['repo'];

        if ($request->hasFile('image')) {

            $path = $project->image;

            if (File::exists($path)) {
                File::delete($path);
            }

            $file = $request->file('image');
            $extension = $file->getClientOriginalName();
            $filename = time() . '.' . $extension;

            $file->move('uploads/projects/', $filename);

            $project->image = 'uploads/projects/' . $filename;
        }
        $project->update();

        return response()->json([
            'status' => 200,
            'success' => 'Updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => 400,
            ]);
        }

        $path = $project->image;

        if (File::exists($path)) {
            File::delete($path);
        }

        $project->delete();

        return response()->json([
            'status' => 200,
            'success' => 'Deleted successfully',
        ]);
    }
}
