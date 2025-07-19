import { post, get } from '../HttpService';

class AuthenticationApi{

    static authenticate_user = (queryData) => {
        let url = "merchant/api/v1/login/";
        return post(url,queryData);
    }

    static invalidate_user = () => {
        let url = "merchant/api/v1/logout/";
        let queryData = {};
        return get(url,queryData);
    }

    static get_merchant_apps = () => {
        let url = "merchant/api/v1/merchantApps/";
        let queryData = {};
        return post(url,queryData);
    }
}

export default AuthenticationApi;