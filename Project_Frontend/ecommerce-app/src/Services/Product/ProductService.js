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

    static getProductById(productId){
        return axios.get(`${CommonService.PRODUCTS_API}/`+productId);
    }

    static getAllProductWithTotalPage(paginationModel,cateId,sort,search){
        let url = CommonService.PRODUCTS_API+ '?page='+ `${paginationModel.page-1}` + '&' +'size=' + paginationModel.pageSize+'&'
        if(search){
            url+= 'search=' + search +'&';
        }
        if(sort){
            url+='sort=' + sort + '&';
        }
        if(cateId){
            url+='categoryId=' + cateId;
        }
        return axios.get(url);
    }
}