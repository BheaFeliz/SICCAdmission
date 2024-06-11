<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $fillable = [
        'fname', 'lname', 'mname', 'pref', 'age', 'Monthoption', 'date', 'year',
        'sex', 'gender', 'civilstatus', 'contactnumber', 'email', 'pbirth', 'IndigentP',
        'IndigentPy', 'pbs', 'district', 'barangay', 'cityM', 'province', 'Zcode', 'familyB',
        'sincewhen', 'Nsibling', 'supstudy', 'ofw', 'ofwProfession', 'studenttype',
        'Nwork', 'StudentCat', 'F_nameSchool', 'F_Atrack', 'F_AMprovince', 'F_Ygrad',
        'T_nameSchool', 'T_Atrack', 'T_AMprovince', 'T_Ygrad', 'selectcourse'
    ];

    public static $rules = [
        'contactnumber' => 'nullable|digits:11',
        'email' => 'nullable|email',
        // Define other validation rules here...
    ];
}