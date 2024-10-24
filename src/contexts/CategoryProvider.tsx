import { getCategories } from '@/libs/axios/product/categoryApi'
import { CATEGORY_MAPPING } from '@/libs/constants/category'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

interface ChangedCategory {
  id: number
  name: string
}

const CategoryContext = createContext<{
  categories: ChangedCategory[]
}>({
  categories: [],
})

export function CategoryProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<ChangedCategory[]>([])
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
  })
  useEffect(() => {
    if (categoryData)
      setCategories(() =>
        categoryData.map((category) => ({ id: category.id, name: CATEGORY_MAPPING[`${category.id}`] })),
      )
  }, [categoryData])

  return <CategoryContext.Provider value={{ categories }}>{children}</CategoryContext.Provider>
}

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('CategoryProvider내에서 사용하세요')
  }
  return context
}
