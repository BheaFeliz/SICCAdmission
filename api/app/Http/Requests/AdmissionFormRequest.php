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
            'fname' => 'required|string',
            'lname' => 'required|string',
            'mname' => 'nullable|string',
            'pref' => 'nullable|string',
            'age' => 'nullable|integer',
            'Monthoption' => 'nullable|string',
            'date' => 'nullable|integer',
            'year' => 'nullable|integer',
            'sex' => 'nullable|string',
            'gender' => 'nullable|string',
            'civilstatus' => 'nullable|string',
            'contactnumber' => 'nullable|string|max:11',
            'email' => 'nullable|email',
            'pbirth' => 'nullable|string',
            'indigentP' => 'nullable|string',
            'indigentPy' => 'nullable|string',
            'pbs' => 'nullable|string',
            'district' => 'nullable|string',
            'barangay' => 'nullable|string',
            'cityM' => 'nullable|string',
            'province' => 'nullable|string',
            'Zcode' => 'nullable|integer',
            'familyB' => 'nullable|string',
            'sincewhen' => 'nullable|string',
            'Nsibling' => 'nullable|string',
            'supstudy' => 'nullable|string',
            'ofw' => 'nullable|string',
            'ofwProfession' => 'nullable|string',
            'StudentCat' => 'nullable|string',
            'Nwork' => 'nullable|string',
            'studenttype' => 'nullable|string',
            'F_nameSchool' => 'nullable|string',
            'F_Atrack' => 'nullable|string',
            'F_AMprovince' => 'nullable|string',
            'F_Ygrad' => 'nullable|string',
            'T_nameSchool' => 'nullable|string',
            'T_Atrack' => 'nullable|string',
            'T_AMprovince' => 'nullable|string',
            'T_Ygrad' => 'nullable|string',
            'selectcourse' => 'nullable|string',
            'email_verified_at' => 'nullable|date',
        ];
    }
}
