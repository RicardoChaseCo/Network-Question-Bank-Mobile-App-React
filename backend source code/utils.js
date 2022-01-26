const mysql = require("mysql");
const jwt = require('jsonwebtoken');
// 开发环境的host
let host = 'http://127.0.0.1';
// 生产环境的host
// let host = 'http://8.130.20.222';

// 开发环境的port
let port = 9000;
// 生产环境的port
// let port = 80;

// 创建连接池
const pool = mysql.createPool({
    host: "localhost",  // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: 3306, // mysql服务运行的端口
    database: "cms", // 选择某个数据库
    user: "root",   // 用户名
    password: "123456", // 用户密码
})

//对数据库进行增删改查操作的基础
const query = (sql,callback) => {
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release()
        })
    })
}

/* 
    返回信息的结构
    errCode: 0代表成功，1代表参数错误，2代表其他错误
    message: 请求结果信息
    data: 返回给前端的数据
*/
const returnMsg = (errCode, message, data) => {
    return {
        errCode: errCode || 0,
        message: message || "",
        data: data || {}
    }
}

/* 
    数据库操作的promise封装
*/
const queryFn = (sql) => {
    return new Promise((resolve, reject) => {
        query(sql, (err, rows) => {
            if (err) reject(err);   // []
            resolve(rows)           // [{}]
        })
    })
}

// 鉴权函数
const jwtVerify = (token) => {
    try {
        // 解密token，可以得到username和password
        jwt.verify(token,'zhaowenxian')
    } catch(err){
        // 鉴权失败
        return false;
    }
    // 鉴权成功
    return true;
}


module.exports = {
    host, port, query, returnMsg, queryFn, jwtVerify
}
