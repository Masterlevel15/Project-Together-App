<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    use HasFactory;

    public function activity() {
        return $this->belongsTo(\App\Models\Activity::class);
    }

    public function user() {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
}
