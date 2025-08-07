<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TakeGallonsRequest extends FormRequest
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
            'gallons' => 'required|integer|min:1|max:10',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'gallons.required' => 'Number of gallons is required.',
            'gallons.integer' => 'Number of gallons must be a whole number.',
            'gallons.min' => 'Must take at least 1 gallon.',
            'gallons.max' => 'Cannot take more than 10 gallons at once.',
        ];
    }
}