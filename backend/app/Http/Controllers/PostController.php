<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index()
    {
        return Post::orderby("created_at", "desc")->with('category:id,name')->paginate(5);
    }

    public function seo_posts()
    {
        return Post::orderby("created_at", "desc")->get();
    }

    public function edit($id)
    {
        return Post::find($id);
    }

    public function postview($slug)
    {
        $post = Post::where('slug', $slug)->where('status','shown')->with('author:id,lastname,firstname,image')->first();
        $postCount = Post::where('slug', $slug)->where('status','shown')->count();
    

        if ($postCount > 0) {
            $post->increment('views_count');
            return response()->json([
                'status' => 200,
                'post' => $post,          
            ]);
        } else {
            return response()->json([
                'status' => 400,
            ]);
        }
    }

    public function latestposts()
    {
        return Post::orderby("created_at", "desc")->where('status', 'shown')->with('category:id,name')->with('author:id,lastname')->take(3)->get();
    }

    public function allposts(Request $request)
    {
        $category = $request->input('category', null);

        $query = Post::orderby("created_at", "desc")->where('status', 'shown')->with('category:id,name')->with('author:id,lastname');

        if ($category !== null) {
            $query->where('category', $category);
        }

        $posts = $query->paginate(3);

        return $posts;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',          
            'content' => 'required',
            'meta_desc' => 'required',
            'image' => 'required|image|max:5000',
            'status' => 'required',
            'author_id' => 'required',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }

        $category = Category::select('id')->where('slug', $request['category'])->first();

        if (!$category) {
            return response()->json([
                'status' => 404,
            ]);
        }

        $post = new Post();
        $post->title = $request['title'];       
        $post->content = $request['content'];
        $post->meta_desc = $request['meta_desc'];
        $post->status = $request['status'];
        $post->author_id = $request['author_id'];
        $post->category = $request['category'];
        $post->category_id = $category->id;
        $post->slug = Str::slug($request['title']);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalName();
            $filename = time() . '.' . $extension;

            $file->move('uploads/posts/', $filename);

            $post->image = 'uploads/posts/' . $filename;
        }
        $post->save();

        return response()->json([
            'status' => 200,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',           
            'content' => 'required',
            'meta_desc' => 'required',
            'image' => 'image|max:5000',
            'status' => 'required',
            'author_id' => 'required',
            'category' => 'required',
            'read_time' => 'required',
            'views_count' =>'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }

        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => 404,
            ]);
        }

        $category = Category::select('id')->where('slug', $request['category'])->first();

        if (!$category) {
            return response()->json([
                'status' => 404,
            ]);
        }

        $post->title = $request['title'];    
        $post->content = $request['content'];
        $post->meta_desc = $request['meta_desc'];
        $post->status = $request['status'];
        $post->author_id = $request['author_id'];
        $post->category = $request['category'];
        $post->category_id = $category->id;
        $post->read_time = $request['read_time'];
        $post->views_count = $request['views_count'];
        $post->slug = Str::slug($request['title']);

        if ($request->hasFile('image')) {
            $path = $post->image;

            if (File::exists($path)) {
                File::delete($path);
            }

            $file = $request->file('image');
            $extension = $file->getClientOriginalName();
            $filename = time() . '.' . $extension;

            $file->move('uploads/posts/', $filename);

            $post->image = 'uploads/posts/' . $filename;
        }
        $post->update();


        return response()->json([
            'status' => 200,
        ]);
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => 400,
            ]);
        }

        $path = $post->image;

        if (File::exists($path)) {
            File::delete($path);
        }

        $post->delete();

        return response()->json([
            'status' => 200,
            'success' => 'Deleted successfully',
        ]);
    }
}
