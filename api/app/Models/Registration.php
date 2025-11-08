<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class Registration extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $fillable = [
        'fname', 'lname', 'mname', 'pref', 'monthoption', 'date', 'year', 'age',
        'sex', 'gender', 'civilstatus', 'contactnumber', 'email', 'pbirth', 'indigentP',
        'indigentPy', 'pbs', 'home_address', 'present_address', 'district', 'barangay',
        'cityM', 'province', 'Zcode', 'familyB', 'sincewhen', 'Nsibling', 'supstudy',
        'ofw', 'ofwprofession', 'studenttype', 'Nwork', 'StudentCat', 'F_nameSchool',
        'F_Atrack', 'F_AMprovince', 'F_Ygrad', 'T_nameSchool', 'T_Atrack', 'T_AMprovince',
        'T_Ygrad', 'courseId', 'schedule_id', 'reference_number', 'semester',
        'academic_year_start', 'academic_year_end', 'application_date', 'birthdate',
        'pwd', 'year_graduated', 'senior_high_track', 'strand', 'lrn', 'gpa',
        'father_name', 'mother_maiden_name', 'family_members', 'dswd_member',
        'dswd_member_details', 'social_assistance_beneficiary', 'social_assistance_details',
        'total_monthly_income', 'psa_certificate_path', 'marriage_certificate_path'
    ];

    protected $casts = [
        'family_members' => 'array',
        'application_date' => 'date',
        'birthdate' => 'date',
        'dswd_member' => 'boolean',
        'social_assistance_beneficiary' => 'boolean',
        'pwd' => 'boolean',
    ];

    protected $appends = [
        'psa_certificate_url',
        'marriage_certificate_url',
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
    public function courses()
    {
        return $this->belongsTo(Course::class);
    }

    public function getPsaCertificateUrlAttribute(): ?string
    {
        return $this->psa_certificate_path
            ? Storage::disk('public')->url($this->psa_certificate_path)
            : null;
    }

    public function getMarriageCertificateUrlAttribute(): ?string
    {
        return $this->marriage_certificate_path
            ? Storage::disk('public')->url($this->marriage_certificate_path)
            : null;
    }
}
