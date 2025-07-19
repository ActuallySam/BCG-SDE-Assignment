import { post, put, httpDelete } from '../HttpService';

class DashboardAPI {

    static get_all_products = (queryData) => {
        let url = "/products/fetchProducts/";
        return post(url,queryData);
    }

    static create_product = (queryData) => {
        let url = "/products/createProduct/";
        return post(url, queryData);
    }

    static update_product = (queryData) => {
        let url = "/products/createProduct/";
        return put(url, queryData);
    }

    static delete_product = (queryData) => {
        let url = "/products/createProduct/";
        return httpDelete(url, queryData);
    }

}

export default DashboardAPI;