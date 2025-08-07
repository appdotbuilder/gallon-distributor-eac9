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
        Schema::create('gallon_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->integer('gallons_taken')->comment('Number of gallons taken');
            $table->integer('remaining_quota')->comment('Remaining quota after transaction');
            $table->date('transaction_date')->comment('Date of transaction');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('transaction_date');
            $table->index(['employee_id', 'transaction_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallon_transactions');
    }
};