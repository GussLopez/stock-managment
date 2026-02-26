import ProductCard from "./ProductCard";

interface CardViewProps {
  data: {
    id: string;
    name: string;
    price: number;
    stock: number;
    sku: string;
    cost: number;
    image: string | null;
  }[]
  isLoading: boolean;
  totalInventario: number
}

export default function CardView({ data, isLoading, totalInventario }: CardViewProps) {

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {data.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}
