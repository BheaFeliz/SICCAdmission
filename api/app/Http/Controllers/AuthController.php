<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:50',
            'username' => 'required|string|max:50', 
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed',
            'role' => 'in:admin,staff',
            'phone' => 'nullable|string|size:11',
            'position' => 'required|string|max:50'
        ]);

        $userData = array_merge($data, ['role' => $data['role'] ?? 'staff']);
        $userData['password'] = Hash::make($userData['password']);

        User::create($userData);

        return response()->json([
            'message' => 'Created user successfully',
        ]);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $fields['username'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'Wrong credentials',
            ], 401);
        }

        $token = $user->createToken('app-token')->plainTextToken;

        // $user->only(['name', 'role']);
        return response()->json([
            // 'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $response = [
            'message' => 'User Logged Out'
        ];

        return response()->json($response, 201);
    }

    public function user(Request $request)
    {
        return $request->user();
    }
    public function changePassword(Request $request)
    {

        $request->validate([
            'old_password' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        $user =  User::find(Auth::id());
        if (!$user || !Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Incorrect old password. Please try again.'], 400);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully.'], 200);
    }
}
