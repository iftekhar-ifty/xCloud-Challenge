<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServerRequest;
use App\Http\Requests\UpdateServerRequest;
use App\Models\Server;
use App\Services\ServerService;

class ServerController extends Controller
{

    public function __construct(
        protected ServerService $service
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return $this->service->all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Server $server)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Server $server)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServerRequest $request, Server $server)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Server $server)
    {
        //
    }
}
