import { useCategory } from '@/contexts/CategoryProvider'
import { useProductQueries } from '@/contexts/ProductProvider'
import classNames from 'classnames'

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const { categories } = useCategory()
  const { productQueries, handleCategory } = useProductQueries()
  return (
    <div className="hidden flex-col items-start pl-[30px] pt-[45px] md:flex md:w-[180px] xl:w-[220px]">
      <span className="pb-5 pl-5">카테고리</span>
      {!!categories.length &&
        categories.map(
          (menu) =>
            menu.name && (
              <button
                onClick={() => {
                  handleCategory(menu.id)
                }}
                key={menu.id}
                className={classNames(
                  'flex h-[45px] w-full items-center rounded-lg pl-5 xl:h-[50px]',
                  productQueries.categoryId === menu.id ? 'bg-unactive' : 'text-brand-gray-dark',
                )}
              >
                {menu.name}
              </button>
            ),
        )}
    </div>
  )
}
