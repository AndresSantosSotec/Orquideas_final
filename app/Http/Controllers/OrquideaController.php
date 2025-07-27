<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Orquidea;
use App\Models\Grupo;
use App\Models\Clase;

class OrquideaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orquideas = Orquidea::with(['grupo', 'clase'])->get();
        return Inertia::render('registro_orquideas/index', [
            'orquideas' => $orquideas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $grupos = Grupo::all();
        $clases = Clase::all();

        return Inertia::render('registro_orquideas/Create', [
            'grupos' => $grupos,
            'clases' => $clases,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre_planta' => ['required', 'string', 'max:255'],
            'origen' => ['nullable', 'string', 'max:255'],
            'id_grupo' => ['required', 'exists:tb_grupo,id_grupo'],
            'id_case' => ['required', 'exists:tb_clase,id_clase'],
        ]);

        Orquidea::create($data);

        return redirect()->route('orquideas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
