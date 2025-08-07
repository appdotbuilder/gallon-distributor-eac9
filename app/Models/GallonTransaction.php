<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GallonTransaction
 *
 * @property int $id
 * @property int $employee_id
 * @property int $gallons_taken
 * @property int $remaining_quota
 * @property \Illuminate\Support\Carbon $transaction_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Employee $employee
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereGallonsTaken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereRemainingQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereTransactionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonTransaction whereId($value)
 * @method static \Database\Factories\GallonTransactionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GallonTransaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'gallons_taken',
        'remaining_quota',
        'transaction_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'transaction_date' => 'date',
        'gallons_taken' => 'integer',
        'remaining_quota' => 'integer',
    ];

    /**
     * Get the employee that owns the transaction.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}