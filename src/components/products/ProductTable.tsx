'use client';
import { getProducts } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { Image, MoreHorizontal, PencilIcon, SlidersHorizontal, TrashIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import ViewProductModal from "./ViewPrductModal";
import { useState } from "react";
import { Button } from "../ui/button";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import EditProductModal from "./EditProductModal";

export default function ProductTable() {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const { data, isLoading, error } = useQuery({
    queryKey: ["StockProducts"],
    queryFn: async () => {
      const data = await getProducts();
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: false
  })

  const totalInventario = data?.reduce((acc, product) => {
    return acc + (product.price * product.stock);
  }, 0) || 0;
  
  return (
    <div className="rounded-md border  mt-6">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead className="w-[40%]">Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>


          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <TableRow
                  key={i}
                  className="w-full text-center text-gray-600"
                >
                  <TableCell><Skeleton className="w-10 h-10" /></TableCell>
                  <TableCell><Skeleton className="w-60 h-3" /></TableCell>
                  <TableCell><Skeleton className="w-20 h-3" /></TableCell>
                  <TableCell><Skeleton className="w-15 h-3" /></TableCell>
                  <TableCell><Skeleton className="w-15 h-3" /></TableCell>
                </TableRow>
              ))
              }
            </>
          ) : (
            <>
              {data?.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div
                      className="p-2 w-fit rounded-sm cursor-pointer bg-accent"
                      onClick={() => {
                        setOpen(true)
                        setSelectedProduct(product.id);
                      }}
                    >
                      <Image className="size-6 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>$ {product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3 justify-between">
                      <span>$ {(product.price * product.stock).toFixed(2)} MXN</span>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size={'icon'}
                            variant={'ghost'}
                          >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs">Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => {
                              setOpenEditModal(true);
                              setSelectedProduct(product.id)
                            }}>
                              <PencilIcon />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <SlidersHorizontal />
                              Ajustar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive">
                              <TrashIcon />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow className="font-bold">
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$ {totalInventario.toFixed(2)} MXN</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <EditProductModal open={openEditModal} setOpen={setOpenEditModal} productId={selectedProduct!} />
      <ViewProductModal open={open} setOpen={setOpen} productId={selectedProduct!} />
    </div >
  );
}