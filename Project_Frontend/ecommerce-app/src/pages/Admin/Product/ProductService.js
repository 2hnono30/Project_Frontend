import axios from "axios";
import { BASE_URL } from "../../../constant/AppConstant";

export const getAllProduct = (page) => {
    return axios.get(`${BASE_URL}/products?page=${page.page - 1}&size=${page.pageSize}&sort=${page.sort}`)
}

export const createProduct = (product) => {
    return axios.post(`${BASE_URL}/products`, product)
}

export const updateProduct = (product) => {
    return axios.patch(`${BASE_URL}/products/${product.id}`, product)
}

export const deleteProduct = (id) => {

    return axios.delete(`${BASE_URL}/products/${id}`)
}