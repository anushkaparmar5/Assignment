import axios from "axios";

const baseAPI = "https://fakestoreapi.com";

export const ProductsAPI = {
  getProducts: () => axios.get(`${baseAPI}/products`),
  getProductById: (id: number) => axios.get(`${baseAPI}/products/${id}`),
  getCategories: () => axios.get(`${baseAPI}/products/categories`),
  getProductsByCategory: (category: string) =>
    axios.get(`${baseAPI}/products/category/${category}`),
};
