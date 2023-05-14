<?php

namespace Database\Factories;

use App\Models\UserActivity;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserActivity>
 */
class UserActivityFactory extends Factory
{
    protected $model = UserActivity::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'user_id' => $this->faker->randomElement(\App\Models\User::pluck('id')),
            'activity_id' => $this->faker->randomElement(\App\Models\Activity::pluck('id')),
        ];
    }
}
