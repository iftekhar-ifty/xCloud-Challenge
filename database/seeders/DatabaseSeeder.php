<?php

namespace Database\Seeders;

use App\Models\Server;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Server::factory(100)->create();
        User::query()->updateOrCreate([
            'email' => 'admin@example.com'
        ],[
            'name' => 'Test User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}
