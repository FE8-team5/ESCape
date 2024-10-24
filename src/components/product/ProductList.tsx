import { PropsWithChildren } from 'react'
import { ProductTypes } from '@/dtos/ProductDto'
import ThemeCard from '../@shared/themeCard/ThemeCard'

interface ProductListProps {
  keyValue?: number
  productList?: ProductTypes[] | null
}

export default function ProductList({ keyValue, children, productList }: PropsWithChildren<ProductListProps>) {
  return (
    <section className="flex flex-col gap-[30px]">
      <div className="text-2xl font-semibold">{children}</div>
      <div className="grid grid-cols-2 gap-[15px] xl:min-w-[940px] xl:grid-cols-3 xl:gap-5">
        {productList &&
          productList.length > 0 &&
          productList.map((product) => (
            <ThemeCard key={keyValue ? product.id + keyValue : product.id} data={product} productId={product.id} />
          ))}
      </div>
    </section>
  )
}
