import { Input } from "@/components/ui/input";
import { ProductForm } from "@/types";

interface ProductPricesProps {
  formData: ProductForm;
  onChange: (data: any) => void;
}

export default function ProductPrices({ formData, onChange }: ProductPricesProps) {

  return (
    <div className="grid grid-cols-2 gap-3 p-2">
      <div>
        <label htmlFor="productStock" className="font-semibold text-xs">Stock</label>
        <Input
          id="productStock"
          placeholder="15"
          type="number"
          min={0}
          onChange={e => onChange({ stock: e.target.value })}
          value={formData.stock}
        />
      </div>
      <div>
        <label htmlFor="minStock" className="font-semibold text-xs">Stock mínimo</label>
        <Input
          id="minStock"
          placeholder="10"
          min={1}
          onChange={e => onChange({ min_stock: e.target.value})}
          value={formData.min_stock}
        />
      </div>
      <div>
        <label htmlFor="maxSotck" className="font-semibold text-xs">Stock máximo</label>
        <Input id="maxSotck" placeholder="100" />
      </div>
    </div>
  )
}
