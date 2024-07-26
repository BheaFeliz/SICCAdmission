<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Import SoftDeletes

class Course extends Model
{
    use HasFactory, SoftDeletes; // Use the SoftDeletes trait

    protected $fillable = ['value', 'label'];

    // Optionally, define the date attributes if you want to customize date handling
    protected $dates = ['deleted_at']; // This is optional, Laravel automatically casts it to a date

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
    
}
