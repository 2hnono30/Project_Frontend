import { CommonService } from "../CommonService";
import axios from "axios";

export  const createCustomerInformation = (data) => {
    return axios.post(`${CommonService.CHECKOUT_API}/checkout`, data);
}