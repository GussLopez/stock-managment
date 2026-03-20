'use client'

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProductForm } from "@/types";
import { ClipboardCheck, ClipboardX } from "lucide-react";
import { useState } from "react";

interface ProductDetailsProps {
  formData: ProductForm;
  onChange: (data: any) => void;
}

export default function ProductDetails({ formData, onChange }: ProductDetailsProps) {
  const [isActive, setIsActive] = useState(true);
  return (

    <div className="lg:grid lg:grid-cols-2 space-y-2 gap-3 p-2">
      <div>
        <label htmlFor="productBrand" className="font-semibold text-xs">Marca</label>
        <Input id="productBrand" placeholder="Marca" />
      </div>
      <div>
        <label htmlFor="productModel" className="font-semibold text-xs">Modelo</label>
        <Input
          id="productModel"
          placeholder="Modelo"
          type="text"
          onChange={e => onChange({ model: e.target.value })}
          value={formData.model!}
        />
      </div>
      <div>
        <label htmlFor="unit" className="font-semibold text-xs">Presentacion</label>
        <Input
          id="unit"
          placeholder="pieza, 100 g, 2 kg, 400 ml"
          onChange={e => onChange({ unit: e.target.value })}
          value={formData.unit!}
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
