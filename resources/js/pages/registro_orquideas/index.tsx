import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Payment, columns } from "./Columns"
import { DataTable } from "./data-table"
import React from 'react';
import { Button } from "@/components/ui/button"


import { Slash } from "lucide-react"
 
import {
  Breadcrumb,
  
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventario',
        href: '/inventario',
    },
];

export default function Dashboard({ orquideas = [] }: { orquideas: Payment[] }) {

    const [data, setData] = React.useState<Payment[]>(orquideas);
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Compras" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-10">
            <h1 className="text-2xl font-bold">Inventario</h1>  
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <li>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </li>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <li>
                    <BreadcrumbPage>Tabla Inventario</BreadcrumbPage>
                  </li>
                  
                </BreadcrumbList>
              </Breadcrumb>
            </div>
              <div className='text-right'>
                <Link href={route('orquideas.create')}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Nueva Orquídea
                  </Button>
                </Link>
              </div>
              <div className="container mx-auto  ">
                <DataTable columns={columns} data={data} />
              </div>

                  {/* Cuarta fila con contenido principal */}
                  <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                  </div>
              </div>
        </AppLayout>
    );
}