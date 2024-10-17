interface ProductCardProps {
  product: ProductListType;
}
export default function ProductCard({ product }: ProductCardProps) {
  return <div key={product.id}>ProductCard</div>;
}
