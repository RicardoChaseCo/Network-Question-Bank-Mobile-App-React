const Router = require('koa-router')
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require("../../../utils")
const moment = require("moment")

// 文章编辑    /article/edit
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
        let {id, title, subTitle, content} = ctx.request.body;
        // 判断必要参数是否有传
        if(!id || !title || !content){
            ctx.body = returnMsg(1, '参数错误');
            return;
        }
        // 查询数据库是否有这篇文章
        let sql = `SELECT * FROM article WHERE id=${id}`;
        let result = await queryFn(sql)
        if(result.length>0){
            let mydate = moment().format('YYYY-MM-DD hh:mm:ss');
            // 代表有这篇文章，修改这篇文章的值
            let sql1 = `UPDATE article SET title='${title || ""}', subTitle='${subTitle || ""}', content='${content || ""}', date='${mydate}', author='${result2[0].username}' WHERE id=${id}`;
            await queryFn(sql1);
            // 如果改完了文章，那么要返回给前端最新的列表
            ctx.body = returnMsg(0, "文章修改成功");
        }else{
            // 文章不存在
            ctx.body = returnMsg(1, '当前编辑的文章不存在');
            return;
        }
    }else{
        // 没有编辑权限
        ctx.body = returnMsg(1, '该用户没有编辑权限');
        return;
    }
})

module.exports = router;