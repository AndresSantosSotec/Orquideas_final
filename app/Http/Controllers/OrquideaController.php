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
        $orquideas = Orquidea::with(['grupo', 'clase', 'participante'])->get();
        $grupos = Grupo::all();

        return Inertia::render('orquideas/Index', [
            'orquideas' => $orquideas,
            'grupos' => $grupos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $grupos = Grupo::all();
        $clases = Clase::all();
        $participantes = \App\Models\Participante::all();

        return Inertia::render('orquideas/Form', [
            'grupos' => $grupos,
            'clases' => $clases,
            'participantes' => $participantes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre_planta' => ['required', 'string', 'max:255'],
            'origen' => ['required', 'string', 'max:255'],
            'id_grupo' => ['required', 'exists:tb_grupo,id_grupo'],
            'id_case' => ['required', 'exists:tb_clase,id_clase'],
            'a' => ['required', 'exists:tb_participante,id'],
            'foto' => ['nullable', 'image'],
        ]);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('orquideas', 'public');
            $data['foto'] = $path;
        }

        $orquidea = Orquidea::create($data);

        if ($request->wantsJson()) {
            return response()->json($orquidea, 201);
        }

        return redirect()->route('orquideas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orquidea = Orquidea::with(['grupo', 'clase', 'participante'])->findOrFail($id);

        return Inertia::render('orquideas/Show', [
            'orquidea' => $orquidea,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $orquidea = Orquidea::findOrFail($id);
        $grupos = Grupo::all();
        $clases = Clase::all();
        $participantes = \App\Models\Participante::all();

        return Inertia::render('orquideas/Form', [
            'orquidea' => $orquidea,
            'grupos' => $grupos,
            'clases' => $clases,
            'participantes' => $participantes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $orquidea = Orquidea::findOrFail($id);

        $data = $request->validate([
            'nombre_planta' => ['required', 'string', 'max:255'],
            'origen' => ['required', 'string', 'max:255'],
            'id_grupo' => ['required', 'exists:tb_grupo,id_grupo'],
            'id_case' => ['required', 'exists:tb_clase,id_clase'],
            'a' => ['required', 'exists:tb_participante,id'],
            'foto' => ['nullable', 'image'],
        ]);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('orquideas', 'public');
            $data['foto'] = $path;
        }

        $orquidea->update($data);

        return redirect()->route('orquideas.show', $orquidea);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $orquidea = Orquidea::findOrFail($id);
        $orquidea->delete();

        return redirect()->route('orquideas.index');
    }
}
