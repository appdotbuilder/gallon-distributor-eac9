<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample employees
        Employee::create([
            'employee_id' => 'EMP001',
            'name' => 'John Doe',
            'department' => 'IT',
            'position' => 'Software Engineer',
            'monthly_quota' => 10,
            'current_quota' => 8,
            'quota_reset_date' => now()->startOfMonth(),
            'is_active' => true,
        ]);

        Employee::create([
            'employee_id' => 'EMP002',
            'name' => 'Jane Smith',
            'department' => 'HR',
            'position' => 'HR Manager',
            'monthly_quota' => 10,
            'current_quota' => 5,
            'quota_reset_date' => now()->startOfMonth(),
            'is_active' => true,
        ]);

        Employee::create([
            'employee_id' => 'EMP003',
            'name' => 'Bob Johnson',
            'department' => 'Finance',
            'position' => 'Accountant',
            'monthly_quota' => 10,
            'current_quota' => 10,
            'quota_reset_date' => now()->startOfMonth(),
            'is_active' => true,
        ]);

        // Create additional random employees
        Employee::factory(20)->create();
    }
}