<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class UserCategory extends Model
{
    use HasFactory;

    protected $table = 'users_has_categories';

    public function users() {
        return $this->belongsToMany(\App\Models\User::class);
    }

    public function categories() {
        return $this->belongsToMany(\App\Models\Category::class);
    }

}
