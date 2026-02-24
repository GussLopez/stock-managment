'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "../animate-ui/components/animate/tabs";
import ProductGeneral from "./createProduct/ProductGeneral";
import ProductDetails from "./createProduct/ProductDetails";
import ProductPrices from "./createProduct/ProductPrices";
import ProductStock from "./createProduct/ProductStock";
import { Button } from "../ui/button";
import { getProductById, updateProduct } from "@/lib/services/productService";
import { useEffect, useState } from "react";
import { ProductForm } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";

interface EditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string
}


export default function EditProductModal({ open, setOpen, productId }: EditModalProps) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    cost: 0,
    stock: 0,
    min_stock: 0,
    sku: '',
    model: '',
    image: null
  });
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: open && !!productId,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        cost: product.cost || 0,
        stock: product.stock || 0,
        min_stock: product.min_stock || 0,
        sku: product.sku || '',
        model: product.model || '',
        image: null
      });
    }
  }, [product]);
  const updateForm = (data: Partial<ProductForm>) =>
    setFormData(prev => ({ ...prev, ...data }))

  const mutation = useMutation({
    mutationFn: async () => await updateProduct(productId, formData),
    onSuccess: () => {
      sileo.show({ title: 'Cambios guardados' })
      queryClient.invalidateQueries({ queryKey: ["stockProducts"] })
    },
    onError: (error) => {
      sileo.error({
        title: "Algo salió mal",
        description: "Por favor intente más tarde.",
      });
      console.error(error)
    },
  })

  const handleEdit = async () => {
    mutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[70vh] overflow-y-scroll scrollbar-hide lg:overflow-y-hidden lg:min-w-200 px-2 lg:p-6">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>Completa los campos con la información del producto para editarlo</DialogDescription>
        </DialogHeader>

        <Tabs>
          <TabsList className="w-full mb-1 lg:mb-4">
            <TabsTrigger value={'general'}>General</TabsTrigger>
            <TabsTrigger value={'detalles'}>Detalles</TabsTrigger>
            <TabsTrigger value={'precios'}>Precios</TabsTrigger>
            <TabsTrigger value={'inventario'}>Inventario</TabsTrigger>
          </TabsList>
          <TabsContents>
            <TabsContent value="general">
              <ProductGeneral formData={formData} onChange={updateForm} />
            </TabsContent>
            <TabsContent value="detalles">
              <ProductDetails formData={formData} onChange={updateForm} />
            </TabsContent>
            <TabsContent value="precios">
              <ProductPrices formData={formData} onChange={updateForm} />
            </TabsContent>
            <TabsContent value="inventario">
              <ProductStock formData={formData} onChange={updateForm} />
            </TabsContent>
          </TabsContents>
        </Tabs>
        <DialogFooter className="mt-1">
          <DialogClose asChild>
            <Button className="w-full sm:w-auto" variant={"outline"}>Cancelar</Button>
          </DialogClose>
          <Button onClick={handleEdit}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
