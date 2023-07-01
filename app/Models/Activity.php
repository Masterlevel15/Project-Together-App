<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    public function country() {
        return $this->belongsTo(\App\Models\Country::class);
    }

    public function city() {
        return $this->belongsTo(\App\Models\City::class);
    }

    public function category() {
        return $this->belongsTo(\App\Models\Category::class);
    }

    public function promoter() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function users() {
        return $this->belongsToMany(\App\Models\User::class, 'users_has_activities');
    }

    public function ratings() {
        return $this->hasMany(\App\Models\Rating::class, 'activity_id');
    }

    public function bookmarks() {
        return $this->hasMany(\App\Models\Bookmark::class, 'activity_id');
    }
}
