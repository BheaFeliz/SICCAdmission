<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Registration;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['name','date', 'startTime', 'endTime', 'description',];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function card()
    {
        return $this->belongsTo(Card::class);
    }
}
