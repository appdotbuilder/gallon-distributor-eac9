<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class ScanController extends Controller
{
    /**
     * Handle barcode scan from Arduino (POST endpoint).
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
        ]);

        $employee = Employee::where('employee_id', $request->employee_id)
            ->where('is_active', true)
            ->first();

        if (!$employee) {
            return response()->json([
                'success' => false,
                'message' => 'Employee not found or inactive.',
            ], 404);
        }

        // Check if quota needs to be reset
        if ($employee->needsQuotaReset()) {
            $employee->resetQuota();
            $employee->refresh();
        }

        return response()->json([
            'success' => true,
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
        ]);
    }
}