<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

class Registration extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'fname', 'lname', 'mname', 'pref', 'age', 'monthoption', 'date', 'year',
        'sex', 'gender', 'civilstatus', 'contactnumber', 'email', 'pbirth', 'indigentP',
        'indigentPy', 'pbs', 'district', 'barangay', 'cityM', 'province', 'Zcode', 'familyB',
        'sincewhen', 'Nsibling', 'supstudy', 'ofw', 'ofwprofession', 'studenttype',
        'Nwork', 'StudentCat', 'F_nameSchool', 'F_Atrack', 'F_AMprovince', 'F_Ygrad',
        'T_nameSchool', 'T_Atrack', 'T_AMprovince', 'T_Ygrad', 'selectcourse', 'schedule_id',
        'reference_number'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {
            // No-op, reference number generated after creating the registration
        });

        static::created(function ($registration) {
            $referenceNumber = $registration->generateReferenceNumber($registration->schedule_id);
            $registration->reference_number = $referenceNumber;
            $registration->save();
        });
    }

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
        $monthDate = now()->format('md');
        Log::info('Generating reference number', ['schedule_id' => $scheduleId]);
        return sprintf('%d-%s-%d', $this->id, $monthDate, $scheduleId);
    }
}
