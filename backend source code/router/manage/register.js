const Router = require('koa-router')
const router = new Router();
const { returnMsg, queryFn } = require("../../utils")

router.post('/', async ctx => {
    let { username, password } = ctx.request.body;
    // 判断username和password是否同时都存在
    if (username && password) {
        // 继续往下，查询数据库是否有该用户
        let sql = `SELECT * FROM user WHERE username='${username}'`;
        let result = await queryFn(sql)
        if(result.length>0){
            // 有这个用户，返回给前端：该用户已注册
            ctx.body = returnMsg(2, "注册失败", "该用户已注册");
        }else{
            // 没有这个用户，开始注册
            /* 
                editable表示可否编辑文章    0表示不允许编辑  1表示可以编辑
                player字段表示是否为管理员  vip表示管理员    normal表示普通用户   默认都是普通用户
            */
            let sql1 = `INSERT INTO user VALUES (null, '${username}', '${password}', null, 'avatar.jpg', 'normal', 0)`;
            await queryFn(sql1)
            ctx.body = returnMsg(0, "注册成功");
        }
    } else {
        ctx.body = returnMsg(1, "请求失败", "参数有错误");
    }
})

module.exports = router;
