<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Server>
 */
class ServerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'ip_address' => $this->faker->ipv4(),
            'provider' => Arr::random(['aws','digitalocean','vultr','other']),
            'status' => Arr::random(['active','inactive','maintenance']),
            'cpu_cores' => Arr::random(['6','10','12','20','34']),
            'ram_mb' => Arr::random(['512','1024','2048']),
            'storage_gb' => Arr::random(['5','10','5']),
        ];
    }
}
