<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        // other fields
    ];

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
