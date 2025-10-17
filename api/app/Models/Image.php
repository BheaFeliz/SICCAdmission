<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use HasFactory;
    
    protected $fillable = ['registration_id', 'path'];

    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        if (!$this->path) {
            return null;
        }
        $relative = ltrim(preg_replace('#^/storage/#', '', $this->path), '/');
        // Always return an absolute URL based on the current request host
        // This avoids depending on APP_URL when served from a different port
        return url('storage/' . $relative);
    }

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }
}
