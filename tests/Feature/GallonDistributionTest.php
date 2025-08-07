<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GallonDistributionTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_main_distribution_page()
    {
        $response = $this->get('/');
        
        $response->assertStatus(200);
        // Test will pass if page loads successfully - detailed content is handled by the frontend
    }

    public function test_can_lookup_active_employee()
    {
        $employee = Employee::factory()->create([
            'employee_id' => 'TEST001',
            'name' => 'Test Employee',
            'is_active' => true,
            'current_quota' => 8,
        ]);

        $response = $this->post('/employee/lookup', [
            'employee_id' => 'TEST001'
        ]);

        $response->assertStatus(200)
            ->assertSee('Test Employee')
            ->assertSee('TEST001')
            ->assertSee('8');
    }

    public function test_cannot_lookup_inactive_employee()
    {
        Employee::factory()->create([
            'employee_id' => 'INACTIVE001',
            'name' => 'Inactive Employee',
            'is_active' => false,
        ]);

        $response = $this->post('/employee/lookup', [
            'employee_id' => 'INACTIVE001'
        ]);

        $response->assertStatus(200)
            ->assertSee('Employee not found or inactive');
    }

    public function test_cannot_lookup_nonexistent_employee()
    {
        $response = $this->post('/employee/lookup', [
            'employee_id' => 'NONEXISTENT'
        ]);

        $response->assertStatus(200)
            ->assertSee('Employee not found or inactive');
    }

    public function test_can_take_gallons_when_quota_available()
    {
        $employee = Employee::factory()->create([
            'employee_id' => 'TEST001',
            'name' => 'Test Employee',
            'current_quota' => 8,
        ]);

        $response = $this->post('/gallon/take', [
            'employee_id' => 'TEST001',
            'gallons' => 3,
        ]);

        $response->assertStatus(200)
            ->assertSee('Successfully distributed 3 gallons')
            ->assertSee('Remaining quota: 5');

        $employee->refresh();
        $this->assertEquals(5, $employee->current_quota);

        $this->assertDatabaseHas('gallon_transactions', [
            'employee_id' => $employee->id,
            'gallons_taken' => 3,
            'remaining_quota' => 5,
        ]);
    }

    public function test_cannot_take_more_gallons_than_quota()
    {
        $employee = Employee::factory()->create([
            'employee_id' => 'TEST001',
            'current_quota' => 2,
        ]);

        $response = $this->post('/gallon/take', [
            'employee_id' => 'TEST001',
            'gallons' => 5,
        ]);

        $response->assertStatus(200)
            ->assertSee('Insufficient quota. Only 2 gallons remaining');

        $employee->refresh();
        $this->assertEquals(2, $employee->current_quota);
    }

    public function test_quota_resets_when_needed()
    {
        $employee = Employee::factory()->create([
            'employee_id' => 'TEST001',
            'current_quota' => 3,
            'monthly_quota' => 10,
            'quota_reset_date' => now()->subMonth(),
        ]);

        $response = $this->post('/employee/lookup', [
            'employee_id' => 'TEST001'
        ]);

        $employee->refresh();
        $this->assertEquals(10, $employee->current_quota);
        $this->assertEquals(now()->startOfMonth()->toDateString(), $employee->quota_reset_date->toDateString());
    }

    public function test_arduino_api_returns_employee_data()
    {
        $employee = Employee::factory()->create([
            'employee_id' => 'TEST001',
            'name' => 'Test Employee',
            'current_quota' => 8,
        ]);

        $response = $this->post('/api/scan', [
            'employee_id' => 'TEST001'
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'employee' => [
                    'employee_id' => 'TEST001',
                    'name' => 'Test Employee',
                    'current_quota' => 8,
                ]
            ]);
    }

    public function test_arduino_api_handles_invalid_employee()
    {
        $response = $this->post('/api/scan', [
            'employee_id' => 'INVALID'
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Employee not found or inactive.',
            ]);
    }
}