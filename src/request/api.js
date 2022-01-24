import request from './request'

// 首页默认数据
export const HomeDefaultApi = () => request.get('/6666');

// 登录接口
export const LoginApi = (params) => request.post('/1024/login', params)

// 注册接口
export const RegisterApi = (params) => request.post('/1024/register', params)

// 选择题目页面的请求
// /1314/{actionCode}/{testType}
export const ChoosePageApi = (params) => request.get(`/1314/${params.actionCode}/${params.testType}`)

// 快速刷题
export const FastAnswerApi = () => request.get(`/4698`);

// 获取题目列表信息
export const GetTimuListApi = (params) => request.post('/1314', params)

// 提交答题内容
export const SubmitApi = (params) => request.put('/1314', params)