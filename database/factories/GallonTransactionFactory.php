<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GallonTransaction>
 */
class GallonTransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\GallonTransaction>
     */
    protected $model = GallonTransaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gallonsTaken = $this->faker->numberBetween(1, 5);
        
        return [
            'employee_id' => Employee::factory(),
            'gallons_taken' => $gallonsTaken,
            'remaining_quota' => $this->faker->numberBetween(0, 10 - $gallonsTaken),
            'transaction_date' => $this->faker->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
        ];
    }
}