// 用户信息接口 （查询，修改）
const Router = require('koa-router')
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require("../../utils")

// 查询用户信息
router.get('/', async ctx=>{
    // 获取前端请求头携带过来的token
    /* 
        ctx.request  请求     ctx.request.headers 请求头   ctx.request.body 请求体
        ctx.response 响应     ctx.response.body   返回给前端的数据
    */
   let token = ctx.request.headers['cms-token'];
    // 鉴权
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2, "查询用户信息失败", "token过期或该用户不存在");
        return;
    }
    // 去数据库查询token对应的用户
    let sql = `SELECT username,token,avatar FROM user WHERE token='${token}'`;
    let result = await queryFn(sql);
    ctx.body = result[0];
})

// 查询用户信息  get  /info 
// 修改用户信息  post  /info 

// 修改用户信息
router.post('/', async ctx=>{
    let token = ctx.request.headers['cms-token'];
    // 鉴权
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2, "查询用户信息失败", "token过期或该用户不存在");
        return;
    }
    // 鉴权成功：修改数据库中对应的字段
    let {username, password} = ctx.request.body;
    // 先检索数据库中是否有用户要改的名字
    let sql3 = `SELECT * FROM user WHERE username='${username}'`;
    let result3 = await queryFn(sql3);
    if(result3.length>0){
        // 当前数据库存在这个用户名
        ctx.body = returnMsg(1, "用户名已被占用");
        return;
    }

    // 最好是强制要求前端必须传这两个字段
    // 或者后端自己先去获取token对应的用户名和密码
    // 可以通过检索数据库获取username和password的旧值 
    let sql2 = `SELECT username,password FROM user WHERE token='${token}'`;
    let result2 = await queryFn(sql2);

    let sql = `UPDATE user SET username='${username || result2[0].username}',password='${password || result2[0].password}' WHERE token='${token}'`;
    await queryFn(sql);
    // 重新查询当前用户的数据，返回给前端
    let sql1 = `SELECT username,token,avatar FROM user WHERE token='${token}'`;
    let result = await queryFn(sql1);
    ctx.body = returnMsg(0, "修改成功", {
        avatar: result[0].avatar,
        username: result[0].username,
        "cms-token": result[0].token
    });
})


module.exports = router;