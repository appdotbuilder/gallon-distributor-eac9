<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeManagementTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_authenticated_user_can_view_employees_list()
    {
        $employee = Employee::factory()->create();

        $response = $this->actingAs($this->user)
            ->get('/employees');

        $response->assertStatus(200)
            ->assertSee($employee->name)
            ->assertSee($employee->employee_id);
    }

    public function test_authenticated_user_can_create_employee()
    {
        $employeeData = [
            'employee_id' => 'TEST001',
            'name' => 'Test Employee',
            'department' => 'IT',
            'position' => 'Developer',
            'monthly_quota' => 10,
        ];

        $response = $this->actingAs($this->user)
            ->post('/employees', $employeeData);

        $response->assertRedirect();
        $this->assertDatabaseHas('employees', [
            'employee_id' => 'TEST001',
            'name' => 'Test Employee',
            'monthly_quota' => 10,
            'current_quota' => 10,
        ]);
    }

    public function test_authenticated_user_can_view_employee_details()
    {
        $employee = Employee::factory()->create();

        $response = $this->actingAs($this->user)
            ->get("/employees/{$employee->id}");

        $response->assertStatus(200)
            ->assertSee($employee->name)
            ->assertSee($employee->employee_id);
    }

    public function test_authenticated_user_can_update_employee()
    {
        $employee = Employee::factory()->create();
        
        $updateData = [
            'employee_id' => $employee->employee_id,
            'name' => 'Updated Name',
            'department' => 'HR',
            'position' => 'Manager',
            'monthly_quota' => 15,
            'current_quota' => 10,
            'is_active' => true,
        ];

        $response = $this->actingAs($this->user)
            ->put("/employees/{$employee->id}", $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('employees', [
            'id' => $employee->id,
            'name' => 'Updated Name',
            'department' => 'HR',
            'monthly_quota' => 15,
        ]);
    }

    public function test_authenticated_user_can_delete_employee()
    {
        $employee = Employee::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete("/employees/{$employee->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('employees', [
            'id' => $employee->id,
        ]);
    }

    public function test_guest_cannot_access_employee_management()
    {
        $response = $this->get('/employees');
        $response->assertRedirect('/login');

        $response = $this->post('/employees', []);
        $response->assertRedirect('/login');
    }
}