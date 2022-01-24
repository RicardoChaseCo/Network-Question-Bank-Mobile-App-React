import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',	// 通过使用配置的proxy来解决跨域
  timeout: 5000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("x-auth-token");
  if (token) {
    config.headers = {
      "x-auth-token": token
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default instance;