import { File, FileText, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "../animate-ui/components/animate/tabs";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/services/productService";
import { CubeIcon, FileTextIcon, PackageIcon, TagIcon, TextboxIcon, TrendUpIcon } from "@phosphor-icons/react";
import { Badge } from "../ui/badge";
interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string
}

export default function ViewProductModal({ open, setOpen, productId }: ModalProps) {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: Boolean(open && productId),
    staleTime: 0,
  });

  const profit = (product?.price ?? 0) - (product?.cost ?? 0);
  const isProfit = profit >= 0;

  const lowStock = (product?.stock ?? 0) <= (product?.min_stock ?? 0)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 overflow-hidden">
        <DialogHeader className="border-b"  >
          <div className="relative w-full h-48 sm:h-56 flex items-center justify-center group overflow-hidden shrink-0">
            <div className="flex flex-col justify-center items-center text-gray-300">
              {product?.image ? (
                <img src={product.image} alt={`imagen de ${product.name}`} />
              ) : (
                <>
                  <Image className="size-10" />
                  <span className="text-xs">Sin imagen</span>
                </>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-4 right-4 z-10 flex-col gap-1.5">
              <DialogTitle className="text-xl sm:text-2xl font-bold drop-shadow-lg leading-tight wrap-break-words line-clamp-2">{product?.name}</DialogTitle>
            </div>
          </div>
        </DialogHeader>
        <Tabs className="gap-0 px-2 mt-2">
          <TabsList className="w-full">
            <TabsTrigger value={'general'}>General</TabsTrigger>
            <TabsTrigger value={'precios'}>Precios</TabsTrigger>
            <TabsTrigger value={'inventario'}>Inventario</TabsTrigger>
            <TabsTrigger value={'detalles'}>Detalles</TabsTrigger>
          </TabsList>
          <TabsContents>
            <TabsContent value="general">
              <div className="p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-cyan-500" />
                    <p className="font-semibold text-gray-700 dark:text-neutral-200">Descripción</p>
                  </div>
                  <div className="w-full h-20 mt-2 px-4 py-2 border rounded-md text-sm text-gray-700 dark:text-neutral-400 line-clamp-2">
                    {product?.description}
                  </div>
                </div>

                <div className="mt-4 font-medium">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2">
                      <TagIcon size={20} />
                      <p>Categoría</p>
                    </div>

                    <p className="font-normal text-sm italic text-gray-500">No disponible</p>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2">
                      <CubeIcon size={20} />
                      <p>Marca</p>
                    </div>

                    <p className="font-normal text-sm italic text-gray-500">No disponible</p>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <TextboxIcon size={20} />
                      <p>Modelo</p>
                    </div>

                    <p
                      className={`font-normal text-sm ${product?.model ? 'font-medium' : 'italic text-gray-500'}`}>
                      {product?.model ? product.model : 'No disponible'}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="precios">
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Costo del Producto</p>
                    <p className="text-xl font-bold mt-1.5">$ {product?.cost} MXN</p>
                  </div>
                  <div className="p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Precio de Venta</p>
                    <p className="text-xl font-bold mt-1.5">$ {product?.price} MXN</p>
                  </div>
                </div>
                <div className="col-span-2 mt-4 flex justify-between border rounded-lg px-3 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <TrendUpIcon size={20} weight="bold" className={`${isProfit ? 'text-green-600' : 'text-red-600'}`} />
                    Ganancia Estimada (MXN)
                  </div>
                  <div className={`text-end ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
                    <p className="font-semibold text-xs">
                      {product?.price && product?.cost ? (product?.price - product?.cost).toFixed(2) : (0).toFixed(2)} MXN
                    </p>
                    <p className="text-xs">
                      {product?.price && product?.cost ? (((product?.price / product?.cost) - 1) * 100).toFixed(2) : 0.00}% Margen
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="inventario">
              <div className="p-4">
                <div className="grid grid-cols-12 px-2 py-4 border rounded-md">
                  <div className="col-span-5 grid grid-cols-4 gap-10">
                    <div className="w-11 h-11 p-2 rounded-full bg-primary/20 text-primary">
                      <PackageIcon size={28} weight="bold" />
                    </div>

                    <div className="col-span-3">
                      <p className="text-xs font-semibold">STOCK ACTUAL</p>
                      <p className="text-2xl font-bold">{product?.stock}</p>
                    </div>
                  </div>
                  <div className="col-span-2 col-start-11 flex justify-center items-center">
                    <Badge
                      variant={lowStock ? 'destructive' : 'default'}
                    >{lowStock ? 'Bajo' : 'Normal'}</Badge>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-12 mt-5 py-3">
                    <div className="flex items-center gap-2 col-span-4 font-medium">
                      <PackageIcon size={20} />
                      <p>Stock mínimo</p>
                    </div>

                    <p
                      className={`col-span-4 text-sm text-end pr-3 ${product?.min_stock ? 'font-medium col-start-12' : 'col-start-10 text-end italic text-gray-500'}`}>
                      {product?.min_stock ? product.min_stock : 'No disponible'}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </TabsContents>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
