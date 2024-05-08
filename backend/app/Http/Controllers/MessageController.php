<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function index()
    {
        return Message::orderby("created_at", "desc")->paginate(3);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required',
            'name' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
            'email' => 'email|nullable|sometimes',
            'message' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }

        $new_message = new Message();
        $new_message->name = $request['name'];
        $new_message->subject = $request['subject'];
        $new_message->email = $request['email'];
        $new_message->message = $request['message'];
        $new_message->save();

        return response()->json([
            'status' => 200,
        ]);
    }

    public function destroy($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json([
                'status' => 400,
            ]);
        }        

        $message->delete();

        return response()->json([
            'status' => 200,
            'success' => 'Deleted successfully',
        ]);
    }
}
