<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::orderBy('name')
            ->paginate(15)
            ->through(fn($employee) => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'position' => $employee->position,
                'monthly_quota' => $employee->monthly_quota,
                'current_quota' => $employee->current_quota,
                'is_active' => $employee->is_active,
                'quota_reset_date' => $employee->quota_reset_date->format('Y-m-d'),
            ]);
        
        return Inertia::render('admin/employees/index', [
            'employees' => $employees
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/employees/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $employee = Employee::create([
            ...$request->validated(),
            'current_quota' => $request->monthly_quota,
            'quota_reset_date' => now()->startOfMonth(),
            'is_active' => true,
        ]);

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $employee->load(['transactions' => function($query) {
            $query->latest()->limit(10);
        }]);

        return Inertia::render('admin/employees/show', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'position' => $employee->position,
                'monthly_quota' => $employee->monthly_quota,
                'current_quota' => $employee->current_quota,
                'is_active' => $employee->is_active,
                'quota_reset_date' => $employee->quota_reset_date->format('Y-m-d'),
                'created_at' => $employee->created_at->format('Y-m-d H:i'),
                'transactions' => $employee->transactions->map(fn($transaction) => [
                    'id' => $transaction->id,
                    'gallons_taken' => $transaction->gallons_taken,
                    'remaining_quota' => $transaction->remaining_quota,
                    'transaction_date' => $transaction->transaction_date->format('Y-m-d'),
                    'created_at' => $transaction->created_at->format('Y-m-d H:i'),
                ]),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('admin/employees/edit', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'position' => $employee->position,
                'monthly_quota' => $employee->monthly_quota,
                'current_quota' => $employee->current_quota,
                'is_active' => $employee->is_active,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $employee->update($request->validated());

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Employee deleted successfully.');
    }
}