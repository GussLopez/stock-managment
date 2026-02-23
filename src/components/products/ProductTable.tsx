'use client';
import { getProducts } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { Image } from "lucide-react";

export default function ProductTable() {

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
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-end">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {data?.map(product => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="p-2 bg-gray-100 w-fit rounded-sm">
                  <Image className="size-6 text-gray-400" />
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>$ {product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="font-medium text-end">$ {(product.price * product.stock).toFixed(2)} MXN</TableCell>
            </TableRow>
          ))}

        </TableBody>
        <TableFooter>
          <TableRow className="font-bold">
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$ {totalInventario.toFixed(2)} MXN</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

    </div>
  );
}