<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TakeGallonsRequest;
use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GallonController extends Controller
{
    /**
     * Display the main gallon distribution interface.
     */
    public function index()
    {
        return Inertia::render('welcome', [
            'employee' => null,
            'success' => null,
            'error' => null,
        ]);
    }

    /**
     * Show employee details by ID.
     */
    public function show(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
        ]);

        $employee = Employee::where('employee_id', $request->employee_id)
            ->where('is_active', true)
            ->first();

        if (!$employee) {
            return Inertia::render('welcome', [
                'employee' => null,
                'success' => null,
                'error' => 'Employee not found or inactive.',
            ]);
        }

        // Check if quota needs to be reset
        if ($employee->needsQuotaReset()) {
            $employee->resetQuota();
            $employee->refresh();
        }

        return Inertia::render('welcome', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'position' => $employee->position,
                'monthly_quota' => $employee->monthly_quota,
                'current_quota' => $employee->current_quota,
                'quota_reset_date' => $employee->quota_reset_date->format('F Y'),
            ],
            'success' => null,
            'error' => null,
        ]);
    }

    /**
     * Process gallon taking transaction.
     */
    public function store(TakeGallonsRequest $request)
    {
        $employee = Employee::where('employee_id', $request->employee_id)
            ->where('is_active', true)
            ->first();

        if (!$employee) {
            return Inertia::render('welcome', [
                'employee' => null,
                'success' => null,
                'error' => 'Employee not found or inactive.',
            ]);
        }

        // Check if quota needs to be reset
        if ($employee->needsQuotaReset()) {
            $employee->resetQuota();
            $employee->refresh();
        }

        $gallons = $request->gallons;

        if ($employee->current_quota < $gallons) {
            return Inertia::render('welcome', [
                'employee' => [
                    'id' => $employee->id,
                    'employee_id' => $employee->employee_id,
                    'name' => $employee->name,
                    'department' => $employee->department,
                    'position' => $employee->position,
                    'monthly_quota' => $employee->monthly_quota,
                    'current_quota' => $employee->current_quota,
                    'quota_reset_date' => $employee->quota_reset_date->format('F Y'),
                ],
                'success' => null,
                'error' => "Insufficient quota. Only {$employee->current_quota} gallons remaining.",
            ]);
        }

        // Process the transaction
        $employee->deductGallons($gallons);
        $employee->refresh();

        // Record the transaction
        GallonTransaction::create([
            'employee_id' => $employee->id,
            'gallons_taken' => $gallons,
            'remaining_quota' => $employee->current_quota,
            'transaction_date' => now()->toDateString(),
        ]);

        return Inertia::render('welcome', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'position' => $employee->position,
                'monthly_quota' => $employee->monthly_quota,
                'current_quota' => $employee->current_quota,
                'quota_reset_date' => $employee->quota_reset_date->format('F Y'),
            ],
            'success' => "Successfully distributed {$gallons} gallon" . ($gallons > 1 ? 's' : '') . ". Remaining quota: {$employee->current_quota}",
            'error' => null,
        ]);
    }


}