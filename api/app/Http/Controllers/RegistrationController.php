<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::all();
        return response()->json(['registrations' => $registrations], 200);
    }

    public function store(AdmissionFormRequest $request)
    {
        // Validate the request data
        $validatedData = $request->validated();

        // Create a new registration record in the database
        $registration = Registration::create($validatedData);

        // Return a JSON response indicating success
        return response()->json(['message' => 'Registration created successfully', 'data' => $registration], 201);
    }

    public function show($id)
    {
        $registration = Registration::findOrFail($id);
        return response()->json(['registration' => $registration], 200);
    }

    public function update(AdmissionFormRequest $request, $id)
    {
        $registration = Registration::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validated();

        // Update the registration record in the database
        $registration->update($validatedData);

        // Return a JSON response indicating success
        return response()->json(['message' => 'Registration updated successfully', 'data' => $registration], 200);
    }

    public function destroy($id)
    {
        $registration = Registration::findOrFail($id);
        $registration->delete();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Registration deleted successfully'], 200);
    }
}
