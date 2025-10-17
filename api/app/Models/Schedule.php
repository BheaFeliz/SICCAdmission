<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'date', 'startTime', 'endTime', 'session', 'remark', 'max_registrations', 'allowed_courses'];

    protected $casts = [
        'allowed_courses' => 'array',
    ];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($schedule) {
            foreach ($schedule->registrations as $registration) {
                $registration->delete();
            }
        });
    }

    public function getDeletedSchedules()
    {
        $deletedSchedules = Schedule::onlyTrashed()->with('registrations')->get();
        return response()->json($deletedSchedules);
    }
}
