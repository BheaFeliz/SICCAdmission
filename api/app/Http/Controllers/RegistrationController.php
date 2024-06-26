<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::all();
        return response()->json(['registrations' => $registrations], 200);
    }

    public function store(Request $request)
{
    // Validate the request data
    $validatedData = $request->validate([
        'fname' => 'required|string|max:255',
        'lname' => 'required|string|max:255',
        'mname' => 'nullable|string|max:255',
        'pref' => 'nullable|string|max:255',
        'age' => 'nullable|integer',
        'Monthoption' => 'nullable|string|max:255',
        'date' => 'nullable|integer',
        'year' => 'nullable|integer',
        'sex' => 'nullable|string|max:255',
        'gender' => 'nullable|string|max:255',
        'civilstatus' => 'nullable|string|max:255',
        'contactnumber' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255',
        'pbirth' => 'nullable|string|max:255',
        'IndigentP' => 'nullable|string|max:255',
        'IndigentPy' => 'nullable|string|max:255',
        'pbs' => 'nullable|string|max:255',
        'district' => 'nullable|string|max:255',
        'barangay' => 'nullable|string|max:255',
        'cityM' => 'nullable|string|max:255',
        'province' => 'nullable|string|max:255',
        'Zcode' => 'nullable|integer',
        'familyB' => 'nullable|string|max:255',
        'sincewhen' => 'nullable|string|max:255',
        'Nsibling' => 'nullable|string|max:255',
        'supstudy' => 'nullable|string|max:255',
        'ofw' => 'nullable|string|max:255',
        'ofwProfession' => 'nullable|string|max:255',
        'studenttype' => 'nullable|string|max:255',
        'Nwork' => 'nullable|string|max:255',
        'StudentCat' => 'nullable|string|max:255',
        'F_nameSchool' => 'nullable|string|max:255',
        'F_Atrack' => 'nullable|string|max:255',
        'F_AMprovince' => 'nullable|string|max:255',
        'F_Ygrad' => 'nullable|string|max:255',
        'T_nameSchool' => 'nullable|string|max:255',
        'T_Atrack' => 'nullable|string|max:255',
        'T_AMprovince' => 'nullable|string|max:255',
        'T_Ygrad' => 'nullable|string|max:255',
        'selectcourse' => 'nullable|string|max:255',
        'fileinput' => 'nullable|array',
        'fileinput.*' => [
            'nullable',
            'image',
            'mimes:jpeg,png,jpg',
            'max:2048', // Adjust max file size as per your requirement
        ],
    ]);

    // Create a new registration instance
    $registration = new Registration();
    $registration->fill($validatedData);
    $registration->save();

    // Handle image uploads
    if ($request->hasFile('fileinput')) {
        foreach ($request->file('fileinput') as $file) {
            $path = Storage::put('registrations', $file); // Use putFile instead of put

            $url = Storage::url($path);
            $registration->images()->create(['path' => $url]);
        }
    }

    // Return a response indicating success
    return response()->json(['message' => 'Registration successful'], 201);
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
