<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Roles asignados al usuario
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    /**
     * Permisos directos del usuario
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'user_permissions');
    }

    /**
     * Asignar rol al usuario
     */
    public function assignRole(Role|string $role): void
    {
        $role = is_string($role)
            ? Role::where('name', $role)->firstOrFail()
            : $role;

        $this->roles()->syncWithoutDetaching($role);
    }

    /**
     * Remover rol del usuario
     */
    public function removeRole(Role|string $role): void
    {
        $role = is_string($role)
            ? Role::where('name', $role)->firstOrFail()
            : $role;

        $this->roles()->detach($role);
    }

    /**
     * Verificar si el usuario tiene un rol específico
     */
    public function hasRole(string $role): bool
    {
        return $this->roles()->where('name', $role)->exists();
    }

    /**
     * Verificar si el usuario tiene cualquiera de los roles especificados
     */
    public function hasAnyRole(array $roles): bool
    {
        return $this->roles()->whereIn('name', $roles)->exists();
    }

    /**
     * Verificar si el usuario tiene todos los roles especificados
     */
    public function hasAllRoles(array $roles): bool
    {
        return $this->roles()->whereIn('name', $roles)->count() === count($roles);
    }

    /**
     * Verificar si el usuario tiene un permiso específico
     * Incluye permisos directos y permisos a través de roles
     */
    public function hasPermission(string $permission): bool
    {
        // Verificar permisos directos
        if ($this->permissions()->where('name', $permission)->exists()) {
            return true;
        }

        // Verificar permisos a través de roles
        return $this->roles()
            ->whereHas('permissions', function ($query) use ($permission) {
                $query->where('name', $permission);
            })
            ->exists();
    }

    /**
     * Verificar si el usuario tiene cualquiera de los permisos especificados
     */
    public function hasAnyPermission(array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if ($this->hasPermission($permission)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Obtener todos los permisos del usuario (directos + a través de roles)
     */
    public function getAllPermissions()
    {
        $directPermissions = $this->permissions;

        $rolePermissions = $this->roles
            ->load('permissions')
            ->pluck('permissions')
            ->flatten();

        return $directPermissions->merge($rolePermissions)->unique('id');
    }

    /**
     * Verificar si el usuario es administrador
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin') || $this->hasRole('super-admin');
    }
}
