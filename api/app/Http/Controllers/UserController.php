<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select(['id', 'name', 'username', 'phone', 'position', 'role', 'email'])->get();
        return response()->json(['users' => $users]);
    }
    
    public function store(Request $request)
    { 
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'phone' => 'nullable|string',
            'position' => 'nullable|string',
            'role' => 'nullable|string',
            'email' => 'required|email|unique:users',
            // add other validation rules as necessary
        ]);

        $validatedData['password'] = Hash::make('!p@ssword123');
        $user = User::create($validatedData);

        if (Auth::check()) {
            $this->logActivity('User created: ' . $user->username);
        } else {
            Log::warning('Unauthorized user attempted to log activity on user creation.');
        }

        return response()->json(['user' => $user], 201);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (Auth::check()) {
            $this->logActivity('User deleted: ' . $user->username);
        } else {
            Log::warning('Unauthorized user attempted to log activity on user deletion.');
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    private function logActivity($action)
    {
        $user = Auth::user();

        if (!$user) {
            Log::error('No authenticated user found while trying to log activity.');
            return;
        }

        ActivityLog::create([
            'user_id' => $user->id,
            'username' => $user->username,
            'action' => $action,
            'data' => null,
        ]);
    }
}
