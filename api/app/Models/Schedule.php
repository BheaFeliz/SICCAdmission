<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'startTime', 'endTime', 'description', 'card_id'];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function card()
    {
        return $this->belongsTo(Card::class);
    }
}
