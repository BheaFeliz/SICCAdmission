<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\AdmissionForm;

class AdmissionFormController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\AdmissionFormRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdmissionFormRequest $request)
    {
        // Validation passed, proceed to store the form data
        AdmissionForm::create($request->validated());

        // Additional logic...

        return response()->json(['message' => 'Form submitted successfully'], 201);
    }

}