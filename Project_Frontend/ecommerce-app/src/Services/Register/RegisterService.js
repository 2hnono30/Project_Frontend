import { CommonService } from "../CommonService";
import axios from "axios";

export class RegisterService {
    static postRegister(user){
        return axios.post(`${CommonService.REGISTER_API}`,user);
    }
}
