import { CommonService } from "../CommonService";
import axios from "axios";


export class BrandService {
    static getBrands(){
        return axios.get(`${CommonService.BRANDS_API}`);
    }
    static getBrandById(id){
        return axios.get(`${CommonService.PRODUCTS_API}?brandId=`+id);
    }
}