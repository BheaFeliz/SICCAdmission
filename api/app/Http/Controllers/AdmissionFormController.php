<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\AdmissionForm;
use Illuminate\Http\Request;

class AdmissionFormController extends Controller
{
    public function index()
    {
        $admissionForms = AdmissionForm::all();
        return response()->json(['admission_forms' => $admissionForms], 200);
    }

    public function store(AdmissionFormRequest $request)
    {
        // Validate the request data
        $validatedData = $request->validated();

        // Create a new admission form record in the database
        $admissionForm = AdmissionForm::create($validatedData);

        // Return a JSON response indicating success
        return response()->json(['message' => 'Admission form created successfully', 'data' => $admissionForm], 201);
    }

    public function show($id)
    {
        $admissionForm = AdmissionForm::findOrFail($id);
        return response()->json(['admission_forms' => $admissionForm], 200);
    }

    public function update(AdmissionFormRequest $request, $id)
    {
        $admissionForm = AdmissionForm::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validated();

        // Update the admission form record in the database
        $admissionForm->update($validatedData);

        // Return a JSON response indicating success
        return response()->json(['message' => 'Admission form updated successfully', 'data' => $admissionForm], 200);
    }

    public function destroy($id)
    {
        $admissionForm = AdmissionForm::findOrFail($id);
        $admissionForm->delete();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Admission form deleted successfully'], 200);
    }
}
