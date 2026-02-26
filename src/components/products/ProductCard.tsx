interface ProductCardProps {
  data: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string | null;
  }[]
  isLoading: boolean;
  totalInventario: number
}

export default function ProductCard({ data, isLoading, totalInventario }: ProductCardProps) {

  return (
    <div>
      ProductCards

      {data.map((product) => (
        <div>
          {product.name}
        </div>
      ))}
    </div>
  )
}
