<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServerRequest;
use App\Http\Requests\UpdateServerRequest;
use App\Services\ServerService;
use Illuminate\Http\Request;

class ServerController extends Controller
{
    public function __construct(
        protected ServerService $service
    )
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = intval($request->query('perPage')) ?? 10;
        $searchValue = (string) $request->query('search_value');
        $filterField =  $request->query('filter_field') ?? null;
        $filterValue =  $request->query('filter_value') ?? null;
        $sortField = (string) $request->query('sort_field');
        $sortDirection = (string) $request->query('sort_direction');


        try {
            $response = $this->service->paginate(
                perPage:$perPage,
                filterField:$filterField,
                filterValue:$filterValue,
                sortField:$sortField,
                sortDirection:$sortDirection,
                searchValue: $searchValue);

            if ($response) {
                return inertia('Home',[
                    'servers' => $response,
                ]);
            }
        } catch (\Exception $exception) {
            return redirect()->back()->with('success', self::EXCEPTION_MESSAGES['DEFAULT']);
        }
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
        try {
            $response = $this->service->store($request->validated());
            if ($response) {
                return redirect()->back()->with('success', self::SUCCESS_MESSAGE['CREATED']);
            } else {
                return redirect()->back()->with('error', self::ERROR_MESSAGES['VALIDATION']);
            }
        } catch (\Exception $exception) {
            return redirect()->back()->with('error', self::EXCEPTION_MESSAGES['DEFAULT']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $response = $this->service->find($id);
            if ($response) {
                return response()->json($response); // JSON for useForm.get
            } else {
                return redirect()->back()->with('error', self::ERROR_MESSAGES['VALIDATION']);
            }

        } catch (\Exception $exception) {
            return redirect()->back()->with('error', self::EXCEPTION_MESSAGES['DEFAULT']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServerRequest $request, string $id)
    {

        try {
            $response = $this->service->updated($request->validated(), $id);
            if ($response) {
                return redirect()->back()->with('success', self::SUCCESS_MESSAGE['UPDATED']);
            } else {
                return redirect()->back()->with('error', self::ERROR_MESSAGES['VALIDATION']);
            }

        } catch (\Exception $exception) {
            return redirect()->back()->with('error', self::EXCEPTION_MESSAGES['DEFAULT']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $response = $this->service->delete($id);
            if ($response) {
                return redirect()->back()->with('success', self::SUCCESS_MESSAGE['DELETED']);
            } else {
                return redirect()->back()->with('error', self::ERROR_MESSAGES['VALIDATION']);
            }

        } catch (\Exception $exception) {
            return redirect()->back()->with('error', self::EXCEPTION_MESSAGES['DEFAULT']);
        }
    }
}
