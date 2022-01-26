const Router = require('koa-router')
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require("../../../utils")
const moment = require("moment")

// 文章编辑    /article/add
router.post('/', async ctx=>{
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2, "查询用户信息失败", "token过期或该用户不存在");
        return;
    }
    // 额外地从token中获取该用户是否有编辑权限
    let sql2 = `SELECT editable, username FROM user WHERE token='${token}'`;
    let result2 = await queryFn(sql2)
    if(result2[0].editable===1){
        // 有编辑权限，结构前端传过来的参数
        let {title, subTitle, content} = ctx.request.body;
        // 判断必要参数是否有传
        if(!title || !content){
            ctx.body = returnMsg(1, '参数错误');
            return;
        }
        let mydate = moment().format('YYYY-MM-DD hh:mm:ss');
        // 添加一篇文章
        let sql1 = `INSERT INTO article VALUES (null, '${title}', '${subTitle || ""}', '${result2[0].username}', '${mydate}', '${content}')`;
        await queryFn(sql1);
        // 如果改完了文章，那么要返回给前端最新的列表
        ctx.body = returnMsg(0, "文章添加成功");
    }else{
        // 没有编辑权限
        ctx.body = returnMsg(1, '该用户没有编辑权限');
        return;
    }
})

module.exports = router;