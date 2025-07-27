import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Grupo = {
  id_grupo: number;
  nombre_grupo: string;
};

type Clase = {
  id_clase: number;
  nombre_clase: string;
};

interface PageProps {
  grupos: Grupo[];
  clases: Clase[];
}

export default function Create({ grupos = [], clases = [] }: PageProps) {
  const { data, setData, post, processing, errors } = useForm({
    nombre_planta: '',
    origen: '',
    id_grupo: '',
    id_case: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('orquideas.store'));
  };

  return (
    <AppLayout>
      <Head title="Registrar Orquídea" />
      <form onSubmit={submit} className="space-y-4 p-6 max-w-md">
        <div>
          <Input
            placeholder="Nombre de la planta"
            value={data.nombre_planta}
            onChange={(e) => setData('nombre_planta', e.target.value)}
          />
          {errors.nombre_planta && (
            <p className="text-red-500 text-sm">{errors.nombre_planta}</p>
          )}
        </div>
        <div>
          <Input
            placeholder="Origen"
            value={data.origen}
            onChange={(e) => setData('origen', e.target.value)}
          />
        </div>
        <div>
          <Select
            value={data.id_grupo}
            onValueChange={(value) => setData('id_grupo', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione grupo" />
            </SelectTrigger>
            <SelectContent>
              {grupos.map((g) => (
                <SelectItem key={g.id_grupo} value={g.id_grupo.toString()}>
                  {g.nombre_grupo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.id_grupo && (
            <p className="text-red-500 text-sm">{errors.id_grupo}</p>
          )}
        </div>
        <div>
          <Select
            value={data.id_case}
            onValueChange={(value) => setData('id_case', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione clase" />
            </SelectTrigger>
            <SelectContent>
              {clases.map((c) => (
                <SelectItem key={c.id_clase} value={c.id_clase.toString()}>
                  {c.nombre_clase}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.id_case && (
            <p className="text-red-500 text-sm">{errors.id_case}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
            Guardar
          </Button>
          <Link href={route('orquideas.index')} className="ml-2 self-center text-sm text-blue-600">
            Cancelar
          </Link>
        </div>
      </form>
    </AppLayout>
  );
}

