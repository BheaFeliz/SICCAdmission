<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $messages = Message::latest()
            ->groupBy('to')
            ->get();

        return response()->json($messages);
    }


    public function show(Request $request, $id)
    {
        $messages = Message::where('to', $id)->paginate(15);

        return response()->json($messages);
    }


    public function store(Request $request, $id)
    {
        $validatedData = $request;

        $message = Message::create($validatedData);
        return response()->json(['message' => $message], 201);
    }
}
