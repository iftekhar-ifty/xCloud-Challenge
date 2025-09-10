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

    public function all()
    {
        return $this->repository->all();
    }

    public function paginate($perPage = 10, string $filterField = null, string $filterValue = null, string $sortField = null, string $sortDirection = null, string $searchValue = null)
    {
        return $this->repository->paginate(
            perPage: $perPage,
            filterField:$filterField,
            filterValue:$filterValue,
            sortField:$sortField,
            sortDirection:$sortDirection,
            searchValue: $searchValue);
    }

    public function store(array $data)
    {
        return $this->repository->create($data);
    }
    public function find($id)
    {
        return $this->repository->find($id);
    }
    public function updated($data, $id)
    {
        return $this->repository->update($data, $id);
    }

    public function delete($id)
    {
        return $this->repository->delete($id);
    }












}
