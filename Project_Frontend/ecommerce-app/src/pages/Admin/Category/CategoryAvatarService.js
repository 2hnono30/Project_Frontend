import axios from "axios";
import {BASE_URL} from "../../../constant/AppConstant";

export const createCategoryAvatar = (image) => {
    const formData = new FormData();
    formData.append('files', image);
    return axios.post(`${BASE_URL}/images`, formData)
}

export const deleteCategoryAvatar = (id) => {

    return axios.delete(`${BASE_URL}/images/${id}`)
}