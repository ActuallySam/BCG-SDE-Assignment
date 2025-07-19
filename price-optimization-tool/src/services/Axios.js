import axios from 'axios';

const unauthorizedRequest = () => {
  return window.location.href = "/login"
}

const axiosIns = axios.create({
  withCredentials:true,
  headers: {
    'Content-type':'application/json',
  },
  baseURL: process.env.REACT_APP_BASE_URL
});

axiosIns.interceptors.request.use(function(data) {
  // if(process.env.REACT_APP_BASE_URL !== "http://0.0.0.0:8050"){
  //   let isCookieSet = document.cookie.includes("easetoken=");
  //   if(!isCookieSet){
  //     return unauthorizedRequest();
  //   }
  // }
  return data;
},(error) => {
  // unauthorizedRequest();
  return Promise.reject(error);
});

axiosIns.interceptors.response.use((response) => {
    return response;
    }, (error) => {
    if(error.response !== undefined){
      if(error.response.status === 401)
        unauthorizedRequest();
    }
    return Promise.reject(error.response);
});
  
export default axiosIns