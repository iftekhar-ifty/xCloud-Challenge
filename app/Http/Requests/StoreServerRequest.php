<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required',
                Rule::unique('servers')->where(function ($query) {
                    $query->where('provider', $this->provider);
                })
            ],
            'provider' => 'required',
            'status' => 'required',
            'cpu_cores' => 'required|integer|min:1|max:128',
            'ram_mb' => 'required|integer|min:512|max:1048576',
            'storage_gb' => 'required|integer|min:10|max:1048576',
            'ip_address' => 'required|unique:servers',
        ];
    }
}
