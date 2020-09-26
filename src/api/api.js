import http from '../utils/request';

let url = '../'

//表格的数据 post请求
export function postBaseTableAPI(params){
    return http.get(`${url}table.json`,params);
}