import { Image, MoreVertical, PencilIcon, SlidersHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { NotePencilIcon, TrashIcon } from "@phosphor-icons/react";
import { Separator } from "../ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    sku: string;
    cost: number;
    image: string | null;
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="h-45 flex flex-col justify-center items-center bg-facent text-neutral-300 dark:text-neutral-600 relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              className="rounded-full absolute right-3 top-3 text-neutral-400"
            >
              <MoreVertical />
              <span className="sr-only">Opciones del producto</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Acciones</DropdownMenuLabel>
              <DropdownMenuItem>
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
        {product?.image ? (
          <img src={product.image} alt={`imagen de ${product.name}`} />
        ) : (
          <>
            <Image className="size-10" />
            <span className="text-xs">Sin imagen</span>
          </>
        )}
      </div>
      <div className="p-3">
        <div>
          <p className="font-semibold">{product.name}</p>
          <Badge variant={'outline'} className="font-mono text-xs rounded">{product.sku}</Badge>
        </div>
        <div className="flex items-center py-1 px-4 mt-3 border rounded-md">
          <div className="flex-1">
            <p className="text-xs font-semibold text-muted-foreground">Costo</p>
            <p className="mt-0.5 text-sm font-semibold">
              $ {product.cost.toLocaleString()}
            </p>
          </div>
          <Separator orientation="vertical" className="mx-4 h-8 w-[0.5px]" />
          <div className="flex-1 text-right">
            <p className="text-xs font-semibold text-muted-foreground">Precio venta</p>
            <p className="mt-0.5 text-sm font-semibold">
              $ {product.price.toLocaleString()}
            </p>
          </div>
        </div>
        <Separator className="my-4 h-[0.5px]" />
        <div className="flex justify-between">
          <p className="font-bold text-lg">$ {(product.price * product.stock).toLocaleString()} MXN</p>
          <p className="text-sm text-green-600 dark:text-green-400 font-bold">{product.stock} un.</p>
        </div>

      </div>
    </div>
  )
}
