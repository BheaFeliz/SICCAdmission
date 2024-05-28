<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionForm extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $fillable = [
        'fname', 'lname', 'mname', 'prefix', 'age', 'Monthoption', 'date', 'year',
        'sex', 'gender', 'civilstatus', 'contactnumber', 'email', 'pbirth', 'IndigentP', // Changed from civil_status
        'indigentPy', 'pbs', 'district', 'brgy', 'citym', 'province', 'Zcode', 'familyB',
        'sincewhen', 'Nsibling', 'supstudy', 'ofw', 'ofwprofession', 'Studenttype', 
        'studentCat', 'F_nameSchool', 'F_Atrack', 'F_AMprovince', 'F_Ygrad', 'T_nameSchool', 
        'T_Atrack', 'T_AMprovince', 'T_Ygrad', 'selectcourse'
    ];

    public static $rules = [
        'contactnumber' => 'nullable|digits:11',
        'email' => 'required|email',
        // Define other validation rules here...
    ];
}
