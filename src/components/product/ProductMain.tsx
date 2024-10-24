import useProducts from '@/hooks/useProducts'
import ProductList from './ProductList'
import { useProductQueries } from '@/contexts/ProductProvider'
import { CATEGORY_MAPPING } from '@/libs/constants/category'
import useInfiniteProducts from '@/hooks/useInfiniteProduct'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function ProductMain() {
  const { productQueries, handleKeyword } = useProductQueries()
  const { data: reviewCountData } = useProducts({ order: 'reviewCount' })
  const { data: ratingData } = useProducts({ order: 'rating' })
  const { data: productData, fetchNextPage } = useInfiniteProducts({
    keyword: productQueries.keyword,
    order: productQueries.order,
    categoryId: productQueries.categoryId,
  })
  const { targetRef } = useInfiniteScroll({
    loadMore: () => {
      fetchNextPage()
    },
    hasMore: !!productData?.pageParams,
  })

  const router = useRouter()
  const { keyword } = router.query

  useEffect(() => {
    if (!keyword) handleKeyword('')
    if (keyword) handleKeyword(keyword as string)
  }, [keyword])

  const hotProducts = reviewCountData?.list.slice(0, 6) || null
  const ratingProducts = ratingData?.list.slice(0, 6) || null
  const allProducts = productData?.pages.flatMap((page) => page.list)
  return (
    <div className="xl:h-100vh-xl scroll-hidden flex w-full max-w-[940px] flex-col gap-[60px] xl:min-w-[940px] xl:gap-[80px] xl:pt-[60px]">
      {productQueries.categoryId && (
        <>
          <ProductList productList={allProducts}>
            <div>{CATEGORY_MAPPING[`${productQueries.categoryId}`]}의 모든 테마</div>
          </ProductList>
          <div ref={targetRef} className="mb-4"></div>
        </>
      )}
      {productQueries.keyword && (
        <>
          <ProductList productList={allProducts}>
            <div>'{productQueries.keyword}'에 대한 검색 결과</div>
          </ProductList>
          <div ref={targetRef} className="mb-4"></div>
        </>
      )}
      {!productQueries.categoryId && !productQueries.keyword && (
        <>
          <ProductList productList={hotProducts}>
            <div>
              지금 핫한 테마
              <span className="bg-gradation bg-clip-text text-transparent">TOP 6</span>
            </div>
          </ProductList>
          <ProductList productList={ratingProducts}>
            <div>별점이 높은 테마</div>
          </ProductList>
        </>
      )}
    </div>
  )
}
