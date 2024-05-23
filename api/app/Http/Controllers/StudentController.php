<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\AdmissionForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    public function store(AdmissionFormRequest $request)
    {
        try {
            // Create a new admission form entry
            $admissionForm = AdmissionForm::create($request->validated());

            // Return a success response
            return response()->json(['admissionForm' => $admissionForm], 201);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error storing admission form: ' . $e->getMessage());

            // Return an error response
            return response()->json(['message' => 'Failed to store admission form'], 500);
        }
    }
}
