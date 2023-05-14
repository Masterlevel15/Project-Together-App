<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory, Faker\Provider\en_US\Address;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CountryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->country(), 
            //
        ];
    }
}
