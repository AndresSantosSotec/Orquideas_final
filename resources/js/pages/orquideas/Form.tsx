import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';

interface Grupo {
  id_grupo: number;
  nombre_grupo: string;
}

interface Clase {
  id_clase: number;
  nombre_clase: string;
  id_grupp: number;
}

interface Participante {
  id: number;
  nombre: string;
}

export interface OrquideaFormProps {
  orquidea?: {
    id_orquidea: number;
    nombre_planta: string;
    origen: string;
    id_grupo: number;
    id_case: number;
    a: number;
  };
  grupos: Grupo[];
  clases: Clase[];
  participantes: Participante[];
}

export default function Form({ orquidea, grupos, clases, participantes }: OrquideaFormProps) {
  const { data, setData, post, put, processing, errors } = useForm({
    nombre_planta: orquidea?.nombre_planta || '',
    origen: orquidea?.origen || '',
    id_grupo: orquidea?.id_grupo?.toString() || '',
    id_case: orquidea?.id_case?.toString() || '',
    a: orquidea?.a?.toString() || '',
    foto: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre_planta', data.nombre_planta);
    formData.append('origen', data.origen);
    formData.append('id_grupo', data.id_grupo);
    formData.append('id_case', data.id_case);
    formData.append('a', data.a);
    if (data.foto) formData.append('foto', data.foto);

    if (orquidea) {
      put(route('orquideas.update', orquidea.id_orquidea), formData);
    } else {
      post(route('orquideas.store'), formData);
    }
  };

  const filteredClases = data.id_grupo
    ? clases.filter((c) => String(c.id_grupp) === data.id_grupo)
    : clases;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-6">
      <div>
        <Input
          value={data.nombre_planta}
          onChange={(e) => setData('nombre_planta', e.target.value)}
          placeholder="Nombre de la planta"
        />
        {errors.nombre_planta && <p className="text-red-500 text-sm">{errors.nombre_planta}</p>}
      </div>
      <div>
        <Select value={data.origen} onValueChange={(val) => setData('origen', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Origen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="especie">Especie</SelectItem>
            <SelectItem value="hibrido">Híbrido</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
        {errors.origen && <p className="text-red-500 text-sm">{errors.origen}</p>}
      </div>
      <div>
        <Select value={data.id_grupo} onValueChange={(val) => setData('id_grupo', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Grupo" />
          </SelectTrigger>
          <SelectContent>
            {grupos.map((g) => (
              <SelectItem key={g.id_grupo} value={g.id_grupo.toString()}>
                {g.nombre_grupo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.id_grupo && <p className="text-red-500 text-sm">{errors.id_grupo}</p>}
      </div>
      <div>
        <Select value={data.id_case} onValueChange={(val) => setData('id_case', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Clase" />
          </SelectTrigger>
          <SelectContent>
            {filteredClases.map((c) => (
              <SelectItem key={c.id_clase} value={c.id_clase.toString()}>
                {c.nombre_clase}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.id_case && <p className="text-red-500 text-sm">{errors.id_case}</p>}
      </div>
      <div>
        <Select value={data.a} onValueChange={(val) => setData('a', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Participante" />
          </SelectTrigger>
          <SelectContent>
            {participantes.map((p) => (
              <SelectItem key={p.id} value={p.id.toString()}>
                {p.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.a && <p className="text-red-500 text-sm">{errors.a}</p>}
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setData('foto', e.target.files ? e.target.files[0] : null)}
        />
        {errors.foto && <p className="text-red-500 text-sm">{errors.foto}</p>}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
          Guardar
        </Button>
        <Link href={route('orquideas.index')} className="self-center text-sm text-blue-600">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
