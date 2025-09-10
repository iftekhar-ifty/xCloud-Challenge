<?php

namespace App\Helper;

class ApiResponse
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public static function success($status = 'success', $messages = '', $data = [], $code = 200)
    {
        return response()->json([
            'status' => $status,
            'message' => $messages,
            'data' => $data,
        ],$code);
    }
    public static function error($status = 'error', $messages = '', $code = 500){
        return response()->json([
            'status' => $status,
            'message' => $messages,
        ],$code);
    }

}
