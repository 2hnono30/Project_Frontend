import axios from  'axios';

export const getAllProvinces = () =>{
    return axios.get (`https://vapi.vnappmob.com/api/province/`)
}
export const getAllDistricts = (provinceId) =>{
    return axios.get(`https://vapi.vnappmob.com/api/province/disctrict/` + provinceId)
}
export const getAllWards = (disctrictId) =>{
    return axios.get(`https://vapi.vnappmob.com/api/province/ward/` + disctrictId)
}