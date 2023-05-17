import { CommonService } from "../CommonService";
import axios from "axios";

export const RegisterService = (data) => {
        return axios.post(`${CommonService.REGISTER_API}`,data);
}
