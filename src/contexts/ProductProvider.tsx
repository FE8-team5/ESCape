import { ProductQueryParams } from '@/libs/axios/product/productApi'
import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

const INITIAL_PRODUCT_QUERIES = {
  keyword: undefined,
  categoryId: undefined,
  order: undefined,
  cursor: undefined,
} as ProductQueryParams

interface ProductContextType {
  productQueries: ProductQueryParams
  handleCategory: (categoryId: number) => void
  handleKeyword: (keyword: string) => void
}

const DEFAULT_CONTEXT_VALUE: ProductContextType = {
  productQueries: INITIAL_PRODUCT_QUERIES,
  handleCategory: () => {},
  handleKeyword: () => {},
}

const ProductContext = createContext(DEFAULT_CONTEXT_VALUE)

export function ProductProvider({ children }: PropsWithChildren) {
  const [productQueries, setProductQueries] = useState(INITIAL_PRODUCT_QUERIES)
  const router = useRouter()

  const handleCategory = (categoryId: number) => {
    setProductQueries((prev) => ({ ...prev, categoryId: categoryId, keyword: null, order: null }))
    const { pathname } = router
    router.push(pathname)
  }

  const handleKeyword = (keyword: string) => {
    setProductQueries((prev) => ({ ...prev, categoryId: null, keyword: keyword, order: null }))
  }

  return (
    <ProductContext.Provider value={{ productQueries, handleCategory, handleKeyword }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductQueries = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('ProductProvider내에서 사용하세요')
  }
  return context
}
