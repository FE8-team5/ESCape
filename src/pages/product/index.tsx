import ProductMain from '@/components/product/ProductMain'
import ReviewerRanking from '@/components/product/ReviewerRanking'
import Sidebar from '@/components/product/Sidebar'
import { ProductProvider } from '@/contexts/ProductProvider'

export default function ProductPage() {
  return (
    <ProductProvider>
      <main className="flex xl:justify-between xl:gap-[80px]">
        <Sidebar />
        <div className="flex flex-grow flex-col justify-between gap-[20px] px-5 pt-[30px] md:w-full md:pl-[25px] md:pr-[30px] md:pt-10 xl:flex-row-reverse xl:pr-0 xl:pt-0">
          <ReviewerRanking />
          <ProductMain />
        </div>
      </main>
    </ProductProvider>
  )
}
