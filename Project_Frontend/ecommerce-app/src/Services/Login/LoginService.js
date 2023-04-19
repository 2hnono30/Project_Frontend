import { CommonService } from "../CommonService";
import axios from "axios";

export class LoginService {
    static postLogin(user){
        return axios.post(`${CommonService.LOGIN_API}`,user);
    }
}
