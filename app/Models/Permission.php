<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    protected $fillable = [
        'name',
        'display_name',
        'description'
    ];

    /**
     * Roles que tienen este permiso
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'permission_role');
    }

    /**
     * Usuarios que tienen este permiso directamente
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_permissions');
    }
}
