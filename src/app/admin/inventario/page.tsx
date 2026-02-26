'use client'
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "@/components/animate-ui/components/animate/tabs";
import AddProduct from "@/components/products/AddProduct";
import ProductTable from "@/components/products/ProductTable";
import { ListDashesIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";

export default function InventarioPage() {
  const [view, setView] = useState("table")

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
      <div className="mt-6">
        {data && view === "table" && <ProductTable data={data} isLoading={isLoading} totalInventario={totalInventario} />}
        {data && view === "card" && <p>Cards</p>}
      </div>
    </div>
  )
}
