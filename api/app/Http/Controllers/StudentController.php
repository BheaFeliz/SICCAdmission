<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\AdmissionForm;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    public function store(AdmissionFormRequest $request)
    {
        // Validate the incoming request
        $validatedData = $request->validated();
        
        // Create or update the AdmissionForm model
        $admissionForm = AdmissionForm::create($validatedData);

        // Optionally, you can perform additional processing here, such as file uploads
        // For example:
        // if ($request->hasFile('files')) {
        //     foreach ($request->file('files') as $file) {
        //         // Process each file
        //     }
        // }

        // Log the successful creation of the AdmissionForm
        Log::info('Admission form submitted successfully', ['admission_form_id' => $admissionForm->id]);

        // Return a response indicating success
        return response()->json($admissionForm, 201);
    }
}
