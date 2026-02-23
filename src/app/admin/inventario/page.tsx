import AddProduct from "@/components/products/AddProduct";
import ProductTable from "@/components/products/ProductTable";
import { Box } from "lucide-react";

export default function InventarioPage() {

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div>
            <Box size={30} />
          </div>
          <h1 className="text-3xl font-semibold">Inventario</h1>
        </div>

        <div>
          <AddProduct />
        </div>
      </div>
      <div>
        <ProductTable />
      </div>
    </div>
  )
}
