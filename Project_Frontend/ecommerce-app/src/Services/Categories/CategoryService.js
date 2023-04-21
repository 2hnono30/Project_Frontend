import { CommonService } from "../CommonService";
import axios from "axios";


export class CategoryService {
    static getCategories(){
        return axios.get(`${CommonService.CATEGORIES_API}`);
    }
    static getCategoryById(id){
        return axios.get(`${CommonService.PRODUCTS_API}?categoryId=`+id);
    }
}