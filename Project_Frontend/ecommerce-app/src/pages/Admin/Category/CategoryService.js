import axios from "axios";
import {BASE_URL} from "../../../constant/AppConstant";

export  const getAllCategory = (page) => {
    return axios.get(`${BASE_URL}/categories?page=${page.page -1}&size=${page.pageSize}&sort=${page.sort}`)
}