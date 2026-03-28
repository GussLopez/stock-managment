'use client'

import { Button } from "../ui/button"
import { RangeDatePicker } from "../ui/range-date"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DownloadSimpleIcon, FileTextIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { getMovements } from "@/lib/services/movementService"
import { Badge } from "../ui/badge"
import { Trash, Trash2 } from "lucide-react"

export default function MovementsHistory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["business-movements"],
    queryFn: async () => {
      const data = await getMovements();
      return data;
    },
    retry: 1
  })

  console.log(data);
  return (
    <div>
      <div className="flex justify-between items-center mt-6">
        <RangeDatePicker />
        <div className="flex gap-2">
          <Button
            variant={'outline'}
            disabled={data?.length === 0}
          >
            <FileTextIcon size={20} weight="bold" />
            PDF Lista
          </Button>
          <Button
            variant={'outline'}
            disabled={data?.length === 0}
          >
            <DownloadSimpleIcon size={20} weight="bold" />
            CSV
          </Button>
        </div>
      </div>
      <div className="mt-5 border border-input rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead className="text-end">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((movement) => {
              const date = new Date(movement.created_at)
              return (
                <TableRow key={movement.id}>
                  <TableCell>{date.toLocaleDateString()}</TableCell>
                  <TableCell>{movement.profiles?.full_name}</TableCell>
                  <TableCell>
                    <Badge className="capitalize">{movement.type}</Badge>
                  </TableCell>
                  <TableCell className="truncate text-muted-foreground">
                    <span className="font-mono text-black">#{movement.products.sku}</span> - {movement.products.name}
                  </TableCell>
                  <TableCell className="font-semibold">{movement.quantity}</TableCell>
                  <TableCell className="truncate max-w-20 text-muted-foreground">{movement.reference || '-'}</TableCell>
                  <TableCell className="text-end">
                    <Button
                      size={'icon-sm'}
                      variant={'ghost'}
                      className="text-red-500 bg-red-600/10 hover:text-red-600 hover:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-600/30"
                    >
                      <Trash2 />
                      <span className="sr-only">Eliminar registro</span>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div >
  )
}
