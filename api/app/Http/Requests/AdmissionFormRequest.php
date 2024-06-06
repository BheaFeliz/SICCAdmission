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
            'pref' => 'nullable|string|in:Jr.,Sr.,I,II,III,IV',
            'age' => 'nullable|integer',
            'Monthoption' => 'nullable|string|in:january,february,march,april,may,june,july,august,september,october,november,december',
            'date' => 'nullable|integer',
            'year' => 'nullable|integer',
            'sex' => 'nullable|string|in:male,female',
            'gender' => 'nullable|string|in:man,woman,lgbtqa+',
            'civilstatus' => 'nullable|string|in:single,married,widowed,singleparent,livein',
            'contactnumber' => 'nullable|string|regex:/^\d{11}$/',
            'email' => 'nullable|string|email|max:255',
            'pbirth' => 'nullable|string|max:255',
            'IndigentP' => 'nullable|string|in:yes,no',
            'IndigentPy' => 'nullable|string|max:255',
            'pbs' => 'nullable|string|max:255',
            'district' => 'nullable|string|in:d1,d2,d3',
            'barangay' => 'nullable|string|max:255',
            'cityM' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'Zcode' => 'nullable|integer',
            'familyB' => 'nullable|string|in:plt,df,dm,dr,mr,pssw',
            'sincewhen' => 'nullable|string|max:255',
            'Nsibling' => 'nullable|string|max:255',
            'supstudy' => 'nullable|string|max:255',
            'ofw' => 'nullable|string|in:yes,no',
            'ofwProfession' => 'nullable|string|max:255',
            'studenttype' => 'nullable|string|in:college1,trans,returnee,crossenrolle',
            'Nwork' => 'nullable|string|max:255',
            'StudentCat' => 'nullable|string|in:Ftime,Wstudent',
            'F_nameSchool' => 'nullable|string|max:255',
            'F_Atrack' => 'nullable|string|max:255',
            'F_AMprovince' => 'nullable|string|max:255',
            'F_Ygrad' => 'nullable|string|max:255',
            'T_nameSchool' => 'nullable|string|max:255',
            'T_Atrack' => 'nullable|string|max:255',
            'T_AMprovince' => 'nullable|string|max:255',
            'T_Ygrad' => 'nullable|string|max:255',
            'selectcourse' => 'nullable|string|in:bsab,bse,bpa,bstmt,bsc',
        ];
    }
}
