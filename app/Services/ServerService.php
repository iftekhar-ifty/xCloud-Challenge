<?php

namespace App\Services;

use App\Repository\ServerRepository;
use Illuminate\Support\Collection;

class ServerService
{
    public $repository;

    public function __construct(ServerRepository $repository)
    {
        $this->repository = $repository;
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }
}
