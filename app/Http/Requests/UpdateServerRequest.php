<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServerRequest extends FormRequest
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

        $serverId = $this->route('id');


        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                Rule::unique('servers')
                    ->where('provider', $this->provider)
                    ->ignore($serverId),
            ],
            'provider'   => 'sometimes|required',
            'status'     => 'sometimes|required',
            'cpu_cores'  => 'sometimes|required|integer',
            'ram_mb'     => 'sometimes|required|integer',
            'storage_gb' => 'sometimes|required|integer',
            'ip_address' => 'sometimes|required',
        ];
    }
}
