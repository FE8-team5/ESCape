import axiosInstance from '../axiosInstance'
import { ResponseProductListTypes } from '@/dtos/ProductDto'

export interface ProductQueryParams {
  keyword?: string | null
  categoryId?: number | null
  order?: 'rating' | 'recent' | 'reviewCount' | null
  cursor?: number | null
}

export const getProduct = async ({
  keyword,
  categoryId,
  order,
  cursor,
}: ProductQueryParams): Promise<ResponseProductListTypes> => {
  try {
    const res = await axiosInstance.get('products', {
      params: {
        keyword: keyword,
        category: categoryId,
        order: order,
        cursor: cursor,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
    return { nextCursor: 0, list: [] } as ResponseProductListTypes
  }
}
