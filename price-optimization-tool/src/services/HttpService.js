import axiosIns from './Axios';
import axios from 'axios';

const get = (url, queryData={}) => {
    return axiosIns.get(url, {params: queryData})
        .then((response)=>{
            return Promise.resolve(response.data);
        }).catch((error)=>{
            return Promise.reject(error);
        });
}

const post = (url, queryData) => {
    return axiosIns.post(url, queryData)
        .then((response)=>{
            return Promise.resolve(response.data);
        }).catch((error)=>{
            return Promise.reject(error);
        });
}

const put = (url, queryData) => {
    return axiosIns.put(url, queryData)
        .then((response)=>{
            return Promise.resolve(response.data);
        }).catch((error)=>{
            return Promise.reject(error);
        });
}

const patch = (url, queryData) => {
    return axiosIns.patch(url, queryData)
        .then((response) => {
            return Promise.resolve(response.data);
        }).catch((error) => {
            return Promise.reject(error);
        });
}

const httpDelete = (url, queryData) => {
    return axiosIns.delete(url, {data:queryData})
        .then((response)=>{
            return Promise.resolve(response.data);
        }).catch((error)=>{
            return Promise.reject(error);
        });
}

const postUploader = (url,queryData) => {
    return axios({
        withCredentials:true,
        baseURL: process.env.REACT_APP_BASE_URL,
        url:url,
        method:'post',
        data:queryData,
        config:{ headers: {'Content-Type': 'multipart/form-data'}}
    }).then((response) => {
        return Promise.resolve(response.data);
    },(error) => {
        return Promise.reject(error.response);
    });
}

export { get, post, put, patch, httpDelete, postUploader }
