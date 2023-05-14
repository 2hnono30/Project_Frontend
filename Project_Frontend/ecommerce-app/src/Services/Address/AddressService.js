import { CommonService } from "../CommonService";
import axios from "axios";

export  const provinceCallAPI = () => {
    return axios.get(`${CommonService.PROVINCE_API}`);
}

export  const districtCallAPI = (provinceId) => {
    return axios.get(`${CommonService.DISTRICT_API}` + provinceId);
}

export  const wardCallAPI = (districtId) => {
    return axios.get(`${CommonService.WARD_API}` + districtId);
}