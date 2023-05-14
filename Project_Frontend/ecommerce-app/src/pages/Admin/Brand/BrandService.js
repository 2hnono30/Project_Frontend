import axios from "axios";
import {BASE_URL} from "../../../constant/AppConstant";

export  const getAllBrand = (page) => {
    return axios.get(`${BASE_URL}/brands?page=${page.page -1}&size=${page.pageSize}&sort=${page.sort}&deleted=${page.deleted}`)
}

export  const createBrand = (brand) => {
    return axios.post(`${BASE_URL}/brands`, brand)
}

export  const updateBrand = (brand) => {
    return axios.patch(`${BASE_URL}/brands/${brand.id}`, brand)
}

export  const deleteBrand = (id) => {

    return axios.patch(`${BASE_URL}/brands/delete/${id}`)
}
export  const restoreBrand = (id) => {

    return axios.patch(`${BASE_URL}/brands/restore/${id}`)
}