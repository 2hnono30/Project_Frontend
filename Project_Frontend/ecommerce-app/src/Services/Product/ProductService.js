import { CommonService } from "../CommonService";
import axios from "axios";

export class ProductService {

    static getAllProducts() {
        return axios.get(`${CommonService.PRODUCTS_API}`);
    }

    static getProductListBySort(sort, cate, page) {
        let url = CommonService.PRODUCTS_API + "?";
        if (sort) {
            url += 'sort=' + sort + '&';
        }
        if (cate) {
            url += 'categoryId=' + cate + '&';
        }
        if (page) {
            url += 'size=' + page;
        }
        return axios.get(url);
    }

    static getProductById(productId) {
        return axios.get(`${CommonService.PRODUCTS_API}/` + productId);
    }

    // static getProductListBySortAndSearch(sort,cate,search){
    //     let url = CommonService.PRODUCTS_API+ "?"
    //     if(sort){
    //         url+='sort=' + sort + '&';
    //     }
    //     if(cate){
    //         url+='categoryId=' + cate + '&';
    //     }
    //     if(search){
    //         url+= 'search=' + search;
    //     }
    //     return axios.get(url);
    // }

    static getAllProductWithTotalPage(paginationModel, cateId, sort, search) {

        let url = CommonService.PRODUCTS_API + '?page=' + `${paginationModel.page - 1}` + '&' + 'size=' + paginationModel.pageSize + '&stock=' + paginationModel.stock + '&outStock=' + paginationModel.outstock + '&'
        if (search) {
            url += 'search=' + search + '&';
        }
        if (sort) {
            url += 'sort=' + sort + '&';
        }
        if (cateId) {
            url += 'categoryId=' + cateId + '&';
        }
        if (paginationModel.price.length != 0) {
            url += 'minPrice=' + paginationModel.price[0] + '&maxPrice=' + paginationModel.price[1] + '&';
        } else {
            url += 'minPrice=' + 0 + '&maxPrice=' + 10000000 + '&';
        }
        if (paginationModel.brand) {
            url += 'brandId=' + paginationModel.brand
        }


        return axios.get(url);
    }
}