<?php

namespace App\Http\Controllers\Apis;

use App\Helper\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServerRequest;
use App\Http\Requests\UpdateServerRequest;
use App\Models\Server;
use App\Services\ServerService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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

//        dd($request->filter_field, $request->query('filter_value'));
        $perPage = intval($request->query('perPage'));
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
                return ApiResponse::success(
                    status: self::STATUS_SUCCESS,
                    messages: self::SUCCESS_MESSAGE['ALL'],
                    data: $response,
                    code: self::SUCCESS_CODE
                );
            }
        } catch (\Exception $exception) {
            return ApiResponse::success(
                status: self::STATUS_ERROR,
                messages: self::EXCEPTION_MESSAGES['DEFAULT'].$exception->getMessage(),
                code: Response::HTTP_EXPECTATION_FAILED,
            );
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
                return ApiResponse::success(
                    status: self::STATUS_SUCCESS,
                    messages: self::SUCCESS_MESSAGE['CREATED'],
                    data: $response,
                    code: self::SUCCESS_CODE
                );
            } else {
                return ApiResponse::error(
                    status: self::STATUS_ERROR,
                    messages: self::ERROR_MESSAGES['VALIDATION'],
                    code: self::VALIDATION_ERROR
                );
            }

        } catch (\Exception $exception) {
            return ApiResponse::error(
                status: self::STATUS_ERROR,
                messages: self::EXCEPTION_MESSAGES['DEFAULT'] . $exception->getMessage(),
                code: Response::HTTP_EXPECTATION_FAILED
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $response = $this->service->find($id);
            if ($response) {
                return ApiResponse::success(
                    status: self::STATUS_SUCCESS,
                    messages: self::SUCCESS_MESSAGE['SHOW'],
                    data: $response,
                    code: self::SUCCESS_CODE
                );
            } else {
                return ApiResponse::error(
                    status: self::STATUS_ERROR,
                    messages: self::ERROR_MESSAGES['NOT_FOUND'],
                    code: self::NOT_FOUND_CODE
                );
            }

        } catch (\Exception $exception) {
            return ApiResponse::error(
                status: self::STATUS_ERROR,
                messages: self::EXCEPTION_MESSAGES['DEFAULT'] . $exception->getMessage(),
                code: Response::HTTP_EXPECTATION_FAILED
            );
        }
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
    public function update(UpdateServerRequest $request, $id)
    {
//        return $request->validated();
        try {
            $response = $this->service->updated($request->validated(), $id);
            if ($response) {
                return ApiResponse::success(
                    status: self::STATUS_SUCCESS,
                    messages: self::SUCCESS_MESSAGE['UPDATED'],
                    data: $response,
                    code: self::SUCCESS_CODE
                );
            } else {
                return ApiResponse::error(
                    status: self::STATUS_ERROR,
                    messages: self::ERROR_MESSAGES['VALIDATION'],
                    code: self::NOT_FOUND_CODE
                );
            }

        } catch (\Exception $exception) {
            return ApiResponse::error(
                status: self::STATUS_ERROR,
                messages: self::EXCEPTION_MESSAGES['DEFAULT'] . $exception->getMessage(),
                code: Response::HTTP_EXPECTATION_FAILED
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $response = $this->service->delete($id);
            if ($response) {
                return ApiResponse::success(
                    status: self::STATUS_SUCCESS,
                    messages: self::SUCCESS_MESSAGE['DELETED'],
                    code: self::SUCCESS_CODE
                );
            } else {
                return ApiResponse::error(
                    status: self::STATUS_ERROR,
                    messages: self::ERROR_MESSAGES['VALIDATION'],
                    code: self::NOT_FOUND_CODE
                );
            }

        } catch (\Exception $exception) {
            return ApiResponse::error(
                status: self::STATUS_ERROR,
                messages: self::EXCEPTION_MESSAGES['DEFAULT'] . $exception->getMessage(),
                code: Response::HTTP_EXPECTATION_FAILED
            );
        }
    }
}
