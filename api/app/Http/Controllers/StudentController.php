<?php

namespace App\Http\Controllers;

use App\Models\AdmissionForm;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate(AdmissionForm::$rules);

        // Create a new admission form entry
        $admissionForm = AdmissionForm::create($validatedData);

        // Return a response
        return response()->json(['admissionForm' => $admissionForm], 201);
    }
}
