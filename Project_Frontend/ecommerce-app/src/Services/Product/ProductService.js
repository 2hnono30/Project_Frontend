import { CommonService } from "../CommonService";
import axios from "axios";

export class ProductService {
  
    static getAllProducts(){
        return axios.get(`${CommonService.PRODUCTS_API}`);
    }
    static getProductListBySort(sort,cate,page){
        let url = CommonService.PRODUCTS_API+ "?";
        if(sort){
            url+='sort=' + sort + '&';
        }
        if(cate){
            url+='categoryId=' + cate + '&';
        }
        if(page){
            url+= 'size=' + page;
        }
        return axios.get(url);
    }
    static getProductListByCateHome(sort,cate,page){
        let url = CommonService.PRODUCTS_API+ "?";
        if(sort){
            url+='sort=' + sort + '&';
        }
        if(cate){
            url+='categoryId=' + cate + '&';
        }
        if(page){
            url+= 'size=' + page;
        }
        return axios.get(url);
    }
    static getProductListBySortAndSearch(sort,cate,search){
        let url = CommonService.PRODUCTS_API+ "?"
        if(sort){
            url+='sort=' + sort + '&';
        }
        if(cate){
            url+='categoryId=' + cate + '&';
        }
        if(search){
            url+= 'search=' + search;
        }
        return axios.get(url);
    }
}