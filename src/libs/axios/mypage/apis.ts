import { UserTypes } from "@/dtos/UserDto"
import axiosInstance from "../axiosInstance"
import { API_PATH } from "../config/path"
import { getUserInfoParams, getUserProductsParams } from "./types";
import { ProductListTypes } from "@/dtos/ProductDto";

export const getMyInfo = async () => {
  const response = await axiosInstance.get<UserTypes>(API_PATH.user.me);
  return response.data ?? [];
}

export const getUserInfo = async ({ userId }: getUserInfoParams) => {
  const response = await axiosInstance.get<UserTypes>(API_PATH.user.user(userId));
  return response.data ?? [];
}

export const getUserProducts = async ({ userId, type }: getUserProductsParams) => {
  const url = (type === 'reviewed') ? API_PATH.user.reviewedProducts(userId) : API_PATH.user.favoriteProducts(userId)
  const response = await axiosInstance.get<ProductListTypes>(url);
  return response.data.list ?? [];
}