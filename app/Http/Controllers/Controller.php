<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public const SUCCESS_CODE = 200;
    public const NOT_FOUND_CODE = 404;
    public const SERVER_ERROR = 500;
    public const AUTHORIZATION = 403;

    public const UNAUTHORIZED = 401;
    public const VALIDATION_ERROR = 402;
    public const STATUS_SUCCESS = 'success';
    public const STATUS_ERROR = 'error';
    public const SUCCESS_MESSAGE = [
        'ALL' => 'All recode load successfully',
        'CREATED' => 'Recode created successfully',
        'UPDATED' => 'Recode updated successfully',
        'DELETED' => 'Recode deleted successfully',
        'SHOW' => 'Recode show successfully',
    ];
    public const ERROR_MESSAGES = [
        'STORE'   => 'Failed to create the record.',
        'UPDATE'  => 'Failed to update the record.',
        'DELETE'  => 'Failed to delete the record.',
        'NOT_FOUND' => 'Record not found.',
        'VALIDATION' => 'Validation error occurred.',
    ];
    public const EXCEPTION_MESSAGES = [
        'DEFAULT' => 'An unexpected error occurred. Please try again later.',
        'DB'      => 'A database error occurred. Please contact support.',
        'UNAUTHORIZED' => 'You are not authorized to perform this action.',
    ];

}
