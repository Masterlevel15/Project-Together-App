<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserActivity extends Model
{
    use HasFactory;
    protected $table = 'users_has_activities';

    public function users() {
        return $this->belongsToMany(\App\Models\User::class);
    }

    public function activities() {
        return $this->belongsToMany(\App\Models\Activity::class);
    }
}
