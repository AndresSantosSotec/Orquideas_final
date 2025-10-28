<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $fillable = [
        'name',
        'display_name',
        'description'
    ];

    /**
     * Usuarios que tienen este rol
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'role_user');
    }

    /**
     * Permisos asociados a este rol
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'permission_role');
    }

    /**
     * Asignar permiso al rol
     */
    public function givePermission(Permission|string $permission): void
    {
        $permission = is_string($permission)
            ? Permission::where('name', $permission)->firstOrFail()
            : $permission;

        $this->permissions()->syncWithoutDetaching($permission);
    }

    /**
     * Revocar permiso del rol
     */
    public function revokePermission(Permission|string $permission): void
    {
        $permission = is_string($permission)
            ? Permission::where('name', $permission)->firstOrFail()
            : $permission;

        $this->permissions()->detach($permission);
    }

    /**
     * Verificar si el rol tiene un permiso específico
     */
    public function hasPermission(string $permission): bool
    {
        return $this->permissions()->where('name', $permission)->exists();
    }
}
