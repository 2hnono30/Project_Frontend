import axios from "axios";
import {BASE_URL} from "../../../constant/AppConstant";

export const createCustomerAvatar = (image) => {
    const formData = new FormData();
    formData.append('files', image);
    return axios.post(`${BASE_URL}/images`, formData)
}

export const deleteCustomerAvatar = (id) => {

    return axios.delete(`${BASE_URL}/images/${id}`)
}