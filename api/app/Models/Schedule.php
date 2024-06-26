<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_id',
        'date',
        'startTime',
        'endTime',
        'description',
    ];

    public function card()
    {
        return $this->belongsTo(Card::class);
    }
}
