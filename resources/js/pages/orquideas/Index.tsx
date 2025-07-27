import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Grupo {
  id_grupo: number;
  nombre_grupo: string;
}

interface Orquidea {
  id_orquidea: number;
  codigo_orquide: string | null;
  grupo: Grupo;
  clase: { nombre_clase: string };
  participante: { nombre: string };
}

interface PageProps {
  orquideas: Orquidea[];
  grupos: Grupo[];
}

export default function Index({ orquideas, grupos }: PageProps) {
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  const filtered = orquideas.filter((o) => {
    const matchesSearch =
      search === '' ||
      o.participante?.nombre.toLowerCase().includes(search.toLowerCase());
    const matchesGroup =
      groupFilter === '' || String(o.grupo?.id_grupo) === groupFilter;
    return matchesSearch && matchesGroup;
  });

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar orquídea?')) {
      router.delete(route('orquideas.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="Orquídeas" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Orquídeas</h1>
          <Link href={route('orquideas.create')}>
            <Button className="bg-blue-600 hover:bg-blue-700">Nueva</Button>
          </Link>
        </div>
        <div className="flex gap-4">
          <Input
            placeholder="Buscar participante"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={groupFilter} onValueChange={setGroupFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar grupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {grupos.map((g) => (
                <SelectItem key={g.id_grupo} value={g.id_grupo.toString()}>
                  {g.nombre_grupo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Participante</th>
                <th className="p-2">Grupo</th>
                <th className="p-2">Clase</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id_orquidea} className="border-b">
                  <td className="p-2">{o.id_orquidea}</td>
                  <td className="p-2">{o.participante?.nombre}</td>
                  <td className="p-2">{o.grupo?.nombre_grupo}</td>
                  <td className="p-2">{o.clase?.nombre_clase}</td>
                  <td className="p-2 space-x-2">
                    <Link href={route('orquideas.show', o.id_orquidea)}>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </Link>
                    <Link href={route('orquideas.edit', o.id_orquidea)}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(o.id_orquidea)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
