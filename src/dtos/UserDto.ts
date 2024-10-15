export interface CommonUserTypes {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export interface MostFavoriteCategoryTypes {
  name: string;
  id: number;
}

export interface UserTypes extends CommonUserTypes {
  mostFavoriteCategory: MostFavoriteCategoryTypes;
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

export interface RankingTypes extends CommonUserTypes {
  reviewCount: number;
  followersCount: number;
}

export interface ProductTypes {
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

export interface ProductListTypes {
  nextCursor: number;
  list: ProductTypes[];
}

export interface FolloweeTypes extends CommonUserTypes {}

export interface FolloweeListTypes {
  follower: FolloweeTypes;
  id: number;
}

export interface FolloweesResponseTypes {
  nextCursor: number;
  list: FolloweeListTypes[];
}

export interface FollowerTypes extends CommonUserTypes {}

export interface FollowerListTypes {
  follower: FollowerTypes;
  id: number;
}

export interface FollowersResponseTypes {
  nextCursor: number;
  list: FollowerListTypes[];
}
