import axios from 'axios';
import { BASE_URL } from '../../../constant/AppConstant';

export const getAllCustomers = (page) => {
    return axios.get(`${BASE_URL}/customers?page=${page.page - 1}&size=${page.pageSize}&sort=${page.sort}`)
}
export const createCustomer = (customer) => {
    return axios.post(`${BASE_URL}/customers`, customer)
}
export const updateCustomer = (customer) => {
    return axios.patch(`${BASE_URL}/customers/${customer.id}`, customer)
}
export const deleteCustomer = (idCustomer) => {

    return axios.delete(`${BASE_URL}/customers/${idCustomer}`)
}