<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;
use App\Models\UserCategory;
use Faker\Generator as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class UserCategoryFactory extends Factory
{
    protected $model = UserCategory::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    public function definition()
    {
        return [
            'user_id' => $this->faker->randomElement(\App\Models\User::pluck('id')),
            'category_id' => $this->faker->randomElement(\App\Models\Category::pluck('id')),
        ];
    }

}
