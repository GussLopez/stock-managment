'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/animate-ui/components/animate/tabs";
import AddProduct from "@/components/products/AddProduct";
import ProductTable from "@/components/products/ProductTable";
import { ListDashesIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { Box, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";
import CardView from "@/components/products/CardView";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Product } from "@/types";
import EditProductModal from "@/components/products/EditProductModal";
import ViewProductModal from "@/components/products/ViewPrductModal";
import { DeleteProduct } from "@/components/products/DeleteProduct";

export default function InventarioPage() {
  const [view, setView] = useState("table")
  type ModalState =
    | { type: "edit"; product: Product }
    | { type: "view"; product: Product }
    | { type: "delete"; product: Product }
    | null
  const [modal, setModal] = useState<ModalState>(null)

  useEffect(() => {
    const savedView = localStorage.getItem("inventory-view")
    if (savedView) {
      setView(savedView)
    }
  }, [])

  const handleChange = (value: string) => {
    setView(value)
    localStorage.setItem("inventory-view", value)
  }

  const { data, isLoading, error } = useQuery<Product[]>({
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

  const openEdit = (product: Product) =>
    setModal({ type: "edit", product })

  const openView = (product: Product) =>
    setModal({ type: "view", product })

  const openDelete = (product: Product) =>
    setModal({ type: "delete", product })

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Box size={30} />
          <h1 className="text-3xl font-semibold">Inventario</h1>
        </div>
        <div className="flex items-center gap-4">
          <Tabs value={view} onValueChange={handleChange}>
            <TabsList>
              <TabsTrigger value="table">
                <ListDashesIcon />
                Tabla
              </TabsTrigger>
              <TabsTrigger value="card">
                <SquaresFourIcon />
                Tarjetas
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <AddProduct />
        </div>
      </div>
      <div className="mt-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar producto, SKU..."
            className="max-w-80 pl-9"
          />
        </div>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-90">
            <Spinner className="size-8" />
          </div>
        ) : (
          <>
            {data && view === "table" &&
              <ProductTable
                data={data}
                totalInventario={totalInventario}
                onEdit={openEdit}
                onDelete={openDelete}
                onView={openView}
              />}
            {data && view === "card" &&
              <CardView
                data={data}
                totalInventario={totalInventario}
                onEdit={openEdit}
                onDelete={openDelete}
                onView={openView}
              />}
          </>
        )}
      </div>
      {modal?.type === "edit" && (
        <EditProductModal
          open
          product={modal.product}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "view" && (
        <ViewProductModal
          open
          product={modal.product}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteProduct
          open
          productId={modal.product.id}
          onClose={() => setModal(null)}
        />
      )}
    </div >
  )
}
