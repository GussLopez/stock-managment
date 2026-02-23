import { Input } from "@/components/ui/input";
import { ProductForm } from "@/types";

interface ProductDetailsProps {
  formData: ProductForm;
  onChange: (data: any) => void;
}

export default function ProductDetails({ formData, onChange }: ProductDetailsProps) {

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
          value={formData.model}  
        />
      </div>
      <div>
        <label htmlFor="productName" className="font-semibold text-xs">Categría</label>
        <Input id="productName" placeholder="Categoría" />
      </div>
      <div>
        <label htmlFor="productName" className="font-semibold text-xs">Presentacion</label>
        <Input id="productName" placeholder="100 g, 2 kg, 400 ml" />
      </div>
    </div>
  )
}
