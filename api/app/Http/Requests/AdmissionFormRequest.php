<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdmissionFormRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
           'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'mname' => 'nullable|string|max:255',
            'pref' => 'nullable|string|max:255',
            'age' => 'nullable|integer',
            'monthoption' => 'nullable|string|max:255',
            'date' => 'nullable|integer',
            'year' => 'nullable|integer',
            'sex' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:255',
            'civilstatus' => 'nullable|string|max:255',
            'contactnumber' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'pbirth' => 'nullable|string|max:255',
            'indigentP' => 'nullable|string|max:255',
            'indigentPy' => 'nullable|string|max:255',
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
            'ofwprofession' => 'nullable|string|max:255',
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
                'max:2048',
            ],
        ];
    }
}
