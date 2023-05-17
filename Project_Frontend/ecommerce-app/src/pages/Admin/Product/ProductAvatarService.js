import axios from "axios";
import { BASE_URL } from "../../../constant/AppConstant";

export const createProductAvatar = (image) => {
    const formData = new FormData();
    if (image.length == undefined) {
        formData.append('files', image);

    } else {
        image.forEach(element => {
            formData.append('files', element)
        });
    }
    return axios.post(`${BASE_URL}/images`, formData)
}

export const deleteBProductAvatar = (id) => {

    return axios.delete(`${BASE_URL}/images/${id}`)
}