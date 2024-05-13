<?php

namespace App\Http\Controllers;

use App\Models\AdmissionForm;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        // Retrieve admission forms from the database
        $admissionform = AdmissionForm::all(); // Assuming Student is the model for admission forms
        
        // Return admission forms as JSON response
        return response()->json(['admissionform' => $admissionform]);
    }
}
