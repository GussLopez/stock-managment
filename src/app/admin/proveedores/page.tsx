'use client'

import AddSupplierDialog from "@/components/admin/AddSupplierDialog";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon } from "@phosphor-icons/react";
import { Truck } from "lucide-react";
import { useState } from "react";

export default function ProveedoresPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Truck size={30} />
          <h1 className="text-3xl font-semibold">Proveedores</h1>
        </div>
        <div>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon size={20} weight="bold" />
            Nuevo Proveedor
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Estatus</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

          </TableBody>
        </Table>
      </div>
      <AddSupplierDialog open={open} setOpen={setOpen} />  
    </div>
  )
}
