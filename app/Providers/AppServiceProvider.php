<?php

namespace App\Providers;

use App\Repository\Interface\RepositoryInterface;
use App\Repository\ServerRepository;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(RepositoryInterface::class, ServerRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
       Inertia::share([
        'flash' => function () {
            return [
                'success' => session('success'),
                'error'   => session('error'),
            ];
        },
    ]);
    }
}
