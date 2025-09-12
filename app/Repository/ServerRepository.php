<?php

namespace App\Repository;

use App\Models\Server;
use App\Repository\Interface\RepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class ServerRepository implements RepositoryInterface
{
    public function all()
    {
        return $this->buildQuery()->all();
    }

    public function paginate($perPage, $filterField = [], $filterValue = [],  $sortField = null,  $sortDirection = null,  $searchValue = null)
    {
        return $this->buildQuery(
            filterField:$filterField,
            filterValue:$filterValue,
            sortField:$sortField,
            sortDirection:$sortDirection,
            searchValue:$searchValue,
        )->paginate($perPage);
    }

    public function find($id)
    {
        return Server::findOrFail($id);
    }

    public function create(array $data)
    {
        return Server::create($data);
    }

    public function update(array $data, $id)
    {
        $server = $this->find($id);
        $server->update($data);

        return $server;
    }

    public function delete($id)
    {
        $server = $this->find($id);
        return $server->delete();

    }

    public function buildQuery(array $filterField = null, array $filterValue = null, string $sortField = null, string $sortDirection = null, string $searchValue = null): Builder
    {
        $query = Server::query();
        if($searchValue != null) {
            $query->where('name', 'like', '%' . $searchValue . '%')
                ->orWhere('ip_address', 'like', '%' . $searchValue . '%')
                ->orWhere('provider', 'like', '%' . $searchValue . '%')
                ->orWhere('status', 'like', '%' . $searchValue . '%')
                ->orWhere('cpu_cores', 'like', '%' . $searchValue . '%')
                ->orWhere('ram_mb', 'like', '%' . $searchValue . '%')
                ->orWhere('storage_gb', 'like', '%' . $searchValue . '%');
        }

        if($filterField && $filterValue){
            foreach ($filterField as $key => $value) {
                $query->where($value, '=', $filterValue[$key]);
            }

//            $query->where($filterField, $filterValue);
        }
        if($sortField && $sortDirection){
            $query->orderBy($sortField, $sortDirection);
        }
        return $query;
    }
}
