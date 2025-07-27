import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Orquidea {
  id_orquidea: number;
  nombre_planta: string;
  origen: string;
  grupo: { nombre_grupo: string };
  clase: { nombre_clase: string };
  participante: { nombre: string };
  foto: string | null;
}

interface PageProps {
  orquidea: Orquidea;
}

export default function Show({ orquidea }: PageProps) {
  return (
    <AppLayout>
      <Head title="Detalle Orquídea" />
      <div className="p-6 space-y-4 max-w-md">
        <h1 className="text-2xl font-bold">{orquidea.nombre_planta}</h1>
        <div>
          <strong>Origen:</strong> {orquidea.origen}
        </div>
        <div>
          <strong>Grupo:</strong> {orquidea.grupo?.nombre_grupo}
        </div>
        <div>
          <strong>Clase:</strong> {orquidea.clase?.nombre_clase}
        </div>
        <div>
          <strong>Participante:</strong> {orquidea.participante?.nombre}
        </div>
        <div>
          {orquidea.foto ? (
            <img src={orquidea.foto} alt="Foto" className="max-w-full" />
          ) : (
            <p>No hay foto disponible</p>
          )}
        </div>
        <Link href={route('orquideas.index')}>
          <Button className="bg-blue-600 hover:bg-blue-700">Inicio</Button>
        </Link>
      </div>
    </AppLayout>
  );
}
