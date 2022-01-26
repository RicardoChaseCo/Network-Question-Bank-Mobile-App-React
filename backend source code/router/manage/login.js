const Router = require('koa-router')
const router = new Router();
const jwt = require('jsonwebtoken');
const { returnMsg, queryFn } = require("../../utils")

router.post('/', async ctx => {
    let { username, password } = ctx.request.body;
    if(username && password){
        // 查询数据库到底有没有这个账户
        let sql = `SELECT * FROM user WHERE username='${username}'`;
        let result = await queryFn(sql)
        if(result.length>0){
            // 存在这个用户，把生成的token更新到这个用户身上
            let token = jwt.sign(
                { username, password },    // 携带信息   密文
                'zhaowenxian',          // 秘钥
                { expiresIn: '1h' }        // 有效期：1h一小时
            )
            let sql1 = `UPDATE user SET token='${token}' WHERE username='${username}'`;
            // 插入token
            await queryFn(sql1)
            // 再次查询用户
            let result1 = await queryFn(sql)
            let obj = {
                username: result1[0].username,
                "cms-token": result1[0].token,
                avatar: result1[0].avatar,
                player: result1[0].player,
                editable: result1[0].editable
            }
            ctx.body = returnMsg(0, "登录成功", obj);
        }else{
            // 不存在这个用户
            ctx.body = returnMsg(2, "用户不存在", "用户不存在，请先注册");
        }
    }else{
        ctx.body = returnMsg(1, "参数错误", "用户名或密码出错");
    }







    // 根据username和password生成token
    

    // 存入数据库

    // ctx.response.body = token;
})

module.exports = router;
