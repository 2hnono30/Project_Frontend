import { CommonService } from "../CommonService";
import axios from "axios";

export  const createCustomerInformation = (customer,totalAmount,cartItems) => {
    return axios.post(`${CommonService.CHECKOUT_API}/checkout`, customer, totalAmount,cartItems);
}