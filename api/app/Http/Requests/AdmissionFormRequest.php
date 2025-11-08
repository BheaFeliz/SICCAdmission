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
            'monthoption' => 'nullable|string|max:255',
            'date' => 'nullable|integer',
            'year' => 'nullable|integer',
            'age' => 'nullable|string',
            'birthdate' => 'nullable|date',
            'sex' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:255',
            'civilstatus' => 'nullable|string|max:255',
            'contactnumber' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'pbirth' => 'nullable|string|max:255',
            'indigentP' => 'nullable|string|max:255',
            'indigentPy' => 'nullable|string|max:255',
            'pbs' => 'nullable|string|max:255',
            'home_address' => 'nullable|string|max:255',
            'present_address' => 'nullable|string|max:255',
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
            'semester' => 'nullable|string|max:255',
            'academic_year_start' => 'nullable|string|max:255',
            'academic_year_end' => 'nullable|string|max:255',
            'application_date' => 'nullable|date',
            'pwd' => 'nullable',
            'year_graduated' => 'nullable|string|max:255',
            'senior_high_track' => 'nullable|string|max:255',
            'strand' => 'nullable|string|max:255',
            'lrn' => 'nullable|string|max:255',
            'gpa' => 'nullable|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'mother_maiden_name' => 'nullable|string|max:255',
            'family_members' => 'nullable|array',
            'family_members.*.name' => 'nullable|string|max:255',
            'family_members.*.relationship' => 'nullable|string|max:255',
            'family_members.*.age' => 'nullable|string|max:255',
            'family_members.*.mobile' => 'nullable|string|max:255',
            'family_members.*.education' => 'nullable|string|max:255',
            'family_members.*.occupation' => 'nullable|string|max:255',
            'family_members.*.income' => 'nullable|string|max:255',
            'dswd_member' => 'nullable',
            'dswd_member_details' => 'nullable|string|max:255',
            'social_assistance_beneficiary' => 'nullable',
            'social_assistance_details' => 'nullable|string|max:255',
            'total_monthly_income' => 'nullable|string|max:255',
            'F_nameSchool' => 'nullable|string|max:255',
            'F_Atrack' => 'nullable|string|max:255',
            'F_AMprovince' => 'nullable|string|max:255',
            'F_Ygrad' => 'nullable|string|max:255',
            'T_nameSchool' => 'nullable|string|max:255',
            'T_Atrack' => 'nullable|string|max:255',
            'T_AMprovince' => 'nullable|string|max:255',
            'T_Ygrad' => 'nullable|string|max:255',
            'courseId' => 'nullable|exists:courses,id',
            'fileinput' => 'nullable|array',
            'fileinput.*' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg',
                'max:2048',
            ],
            'psa_certificate' => [
                'nullable',
                'file',
                'mimes:pdf,jpeg,png,jpg',
                'max:4096',
            ],
            'marriage_certificate' => [
                'nullable',
                'file',
                'mimes:pdf,jpeg,png,jpg',
                'max:4096',
            ],
        ];
    }
}
