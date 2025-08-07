<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique()->comment('Employee ID from barcode');
            $table->string('name')->comment('Employee full name');
            $table->string('department')->nullable()->comment('Employee department');
            $table->string('position')->nullable()->comment('Employee position');
            $table->integer('monthly_quota')->default(10)->comment('Monthly gallon quota');
            $table->integer('current_quota')->default(10)->comment('Current remaining quota');
            $table->date('quota_reset_date')->comment('Last quota reset date');
            $table->boolean('is_active')->default(true)->comment('Employee active status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('is_active');
            $table->index('quota_reset_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};