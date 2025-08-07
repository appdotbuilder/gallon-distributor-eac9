<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|string|max:255|unique:employees,employee_id,' . $this->route('employee')->id,
            'name' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'monthly_quota' => 'required|integer|min:1|max:100',
            'current_quota' => 'required|integer|min:0|max:' . $this->input('monthly_quota', 10),
            'is_active' => 'required|boolean',
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
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.unique' => 'This Employee ID is already taken by another employee.',
            'name.required' => 'Employee name is required.',
            'monthly_quota.required' => 'Monthly quota is required.',
            'monthly_quota.min' => 'Monthly quota must be at least 1.',
            'monthly_quota.max' => 'Monthly quota cannot exceed 100.',
            'current_quota.required' => 'Current quota is required.',
            'current_quota.min' => 'Current quota cannot be negative.',
            'current_quota.max' => 'Current quota cannot exceed monthly quota.',
        ];
    }
}