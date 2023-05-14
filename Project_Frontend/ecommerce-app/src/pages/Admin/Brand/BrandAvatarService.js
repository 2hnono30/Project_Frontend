import axios from "axios";
import {BASE_URL} from "../../../constant/AppConstant";

export const createBrandAvatar = (image) => {
    const formData = new FormData();
    formData.append('files', image);
    return axios.post(`${BASE_URL}/images`, formData)
}

export const deleteBrandAvatar = (id) => {

    return axios.delete(`${BASE_URL}/images/${id}`)
}