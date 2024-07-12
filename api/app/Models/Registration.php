<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Registration extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $fillable = [
        'fname', 'lname', 'mname', 'pref', 'age', 'monthoption', 'date', 'year',
        'sex', 'gender', 'civilstatus', 'contactnumber', 'email', 'pbirth', 'indigentP',
        'indigentPy', 'pbs', 'district', 'barangay', 'cityM', 'province', 'Zcode', 'familyB',
        'sincewhen', 'Nsibling', 'supstudy', 'ofw', 'ofwprofession', 'studenttype',
        'Nwork', 'StudentCat', 'F_nameSchool', 'F_Atrack', 'F_AMprovince', 'F_Ygrad',
        'T_nameSchool', 'T_Atrack', 'T_AMprovince', 'T_Ygrad', 'selectcourse', 'schedule_id'
    ];

    public static $rules = [
        'contactnumber' => 'nullable|digits:11',
        'email' => 'nullable|email',
        // Define other validation rules here...
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function generateReferenceNumber($scheduleId)
{
    // Format the creation date to month and date (e.g., 0628)
    $monthDate = $this->created_at->format('md');
    
    // Log schedule ID
    Log::info('Generating reference number', ['schedule_id' => $scheduleId]);

    // Generate the reference number
    return sprintf('%d-%s-%d', $this->id, $monthDate, $scheduleId);
}

}
