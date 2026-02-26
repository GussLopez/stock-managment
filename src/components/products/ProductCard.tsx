import { Image } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string | null;
  }
}

export default function ProductCard({ product }: ProductCardProps) {

  return (
    <div>
      <div
        className="p-3 rounded-lg border"
        key={product.id}
      >
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
        {product.name}
      </div>
    </div>
  )
}
