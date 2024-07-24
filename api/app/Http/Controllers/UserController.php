<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select(['name', 'username', 'phone', 'position', 'role', 'email'])->get();
        return response()->json(['users' => $users]);
    }
    
    public function store(UserRequest $request)
    { 
        
        $validatedData = $request->validated();
        $validatedData['password'] = Hash::make('!p@ssword123');

        $user = User::create($validatedData);
        return response()->json(['user' => $user], 201);
    }

    public function destroy($id)
    {
        
        $user = User::findOrFail($id);
        
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

 
    
}
