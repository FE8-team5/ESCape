interface ProductListType {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
}

interface CursorBasedPaginationResponse_ProductListType {
  nextCursor?: number | null;
  list: ProductListType[];
}

interface CategoryMetric {
  reviewCount: number;
  favoriteCount: number;
  rating: number;
}

interface Category {
  name: string;
  id: number;
}

interface ProductDetailType {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
  categoryMetric: CategoryMetric;
  category: Category;
  isFavorite: boolean;
  description: string;
}
