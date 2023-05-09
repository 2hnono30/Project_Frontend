import axios from "axios";
import {BASE_URL} from "../../../constant/AppConstant";

export  const getAllCategory = (page) => {
    return axios.get(`${BASE_URL}/categories?page=${page.page -1}&size=${page.pageSize}&sort=${page.sort}`)
}

export  const createCategory = (category) => {
    return axios.post(`${BASE_URL}/categories`, category)
}

export  const updateCategory = (category) => {
    return axios.patch(`${BASE_URL}/categories/${category.id}`, category)
}

export  const deleteCategory = (id) => {

    return axios.delete(`${BASE_URL}/categories/${id}`)
}