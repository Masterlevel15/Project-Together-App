<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->mediumText('intro')->nullable()->change();
            $table->mediumText('description')->nullable()->change();
            $table->date('birthDate')->nullable()->change();
            $table->integer('rate')->nullable()->change();
            $table->unsignedBigInteger('country_id')->nullable()->change();
            $table->unsignedBigInteger('city_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->mediumText('intro')->nullable(false)->change();
            $table->mediumText('descritpion')->nullable(false)->change();
            $table->date('birthDate')->nullable(false)->change();
            $table->integer('rate')->nullable(false)->change();
            $table->unsignedBigInteger('country_id')->nullable(false)->change();
            $table->unsignedBigInteger('city_id')->nullable(false)->change();
        });
    }
};
