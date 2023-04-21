import { CommonService } from "../CommonService";
import axios from "axios";

export class ProductService {
    static getFeatureProducts(){
        return axios.get(`${CommonService.PRODUCTS_API}?size=4`);
    }
    static getAllProducts(){
        return axios.get(`${CommonService.PRODUCTS_API}`);
    }
    static getProductListBySort(sort,cate){
        console.log(sort);
        console.log(cate);
        return axios.get(`${CommonService.PRODUCTS_API}?sort=`+ sort +`&categoryId=` + cate);
    }
}