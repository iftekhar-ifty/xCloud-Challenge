<?php

namespace App\Repository;

use App\Models\Server;
use App\Repository\Interface\RepositoryInterface;

class ServerRepository implements RepositoryInterface
{
    public function all()
    {
        return Server::all();
    }
    public function find($id){
        return Server::find($id);
    }
    public function create(array $data){
        return Server::create($data);
    }
    public function update(array $data, $id){

    }
    public function delete($id){
         return Server::delete($id);
    }
}
