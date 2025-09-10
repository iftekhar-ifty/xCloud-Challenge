<?php

namespace App\Http\Controllers\Apis;

use App\Helper\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated =  $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        try {
            $result = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            return ApiResponse::success(
                status:self::STATUS_SUCCESS,
                messages: self::SUCCESS_MESSAGE['REGISTER'],
                data: $result,
                code: self::SUCCESS_CODE,
            );
        }catch (\Exception $exception){
            return ApiResponse::error(
                status:self::STATUS_ERROR,
                messages: self::EXCEPTION_MESSAGES['DEFAULT'],
                code: self::VALIDATION_ERROR,
            );
        }

    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        try {
            if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                return ApiResponse::error(
                    status:self::STATUS_ERROR,
                    messages: self::ERROR_MESSAGES['LOGIN_FAILED'],
                    code: self::VALIDATION_ERROR,
                );
            }

            $user = Auth::user();
            $token = $user->createToken('MyApp')->plainTextToken;

            $auth_info = [
                'user' => $user,
                'token' => $token,
            ];

            return ApiResponse::success(
                status:self::STATUS_SUCCESS,
                messages: self::SUCCESS_MESSAGE['LOGIN'],
                data: $auth_info,
                code: self::SUCCESS_CODE,
            );

        }catch (\Exception $exception){
            return ApiResponse::error(
                status:self::STATUS_ERROR,
                messages: self::EXCEPTION_MESSAGES['DEFAULT'],
                code: self::VALIDATION_ERROR,
            );
        }


    }
}
