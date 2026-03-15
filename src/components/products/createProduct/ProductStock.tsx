'use client'

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProductForm } from "@/types";
import { ClipboardCheck, ClipboardX } from "lucide-react";
import { useState } from "react";

interface ProductPricesProps {
  formData: ProductForm;
  onChange: (data: any) => void;
}

export default function ProductPrices({ formData, onChange }: ProductPricesProps) {
  const [isActive, setIsActive] = useState(true);
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
          onChange={e => onChange({ min_stock: e.target.value })}
          value={formData.min_stock}
        />
      </div>
      <div>
        <label htmlFor="maxSotck" className="font-semibold text-xs">Código de barras</label>
        <Input
          id="barcode"
          onChange={e => onChange({ barcode: e.target.value })}
          value={formData.barcode!}
        />
      </div>
      <label
        htmlFor="isActive"
        className="h-9.5 mt-6 flex justify-between items-center px-3 rounded-md border border-input has-data-[state=checked]:border-primary/50 relative transition duration-300"
      >
        <span className="flex items-center gap-2 text-xs font-medium">
          {isActive ? <ClipboardCheck size={20} /> : <ClipboardX size={20} />}
          {isActive ? 'Activo' : 'Inactivo'}
        </span>
        <Switch
          id="isActive"
          checked={isActive}
          onCheckedChange={setIsActive}
          onClick={() => onChange({ is_active: isActive })}
        />

      </label>

    </div>
  )
}
