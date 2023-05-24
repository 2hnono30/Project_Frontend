import axios from "axios";
import { BASE_URL } from "../../../constant/AppConstant";

export const getAllOrder = (page) => {
    return axios.get(`${BASE_URL}/user/orders?page=${page.page - 1}&size=${page.pageSize}&sort=${page.sort}&search=${page.search}`)
}



export const updateOrderStatus = (status,id) => {
    return axios.patch(`${BASE_URL}/user/orders/updateStatus/${id}?status=${status}`)
}

export const deleteOrder = (id) => {

    return axios.delete(`${BASE_URL}/orders/${id}`)
}