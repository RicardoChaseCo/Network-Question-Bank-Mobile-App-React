const Router = require('koa-router')
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require("../../../utils")

router.post('/', async ctx=>{
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2, "查询用户信息失败", "token过期或该用户不存在");
        return;
    }
    // 获取要删除的文章的id
    let {id} = ctx.request.body;
    if(!id){
        ctx.body = returnMsg(1, "参数错误");
        return;
    }
    // 判断用户是否有删除文章的权限
    let sql2 = `SELECT editable FROM user WHERE token='${token}'`;
    let result2 = await queryFn(sql2)
    if(result2[0].editable===0){
        // 代表不可以删除
        ctx.body = returnMsg(2, "该用户无删除权限");
        return;
    }
    // 判断该文章是否存在
    let sql = `SELECT * FROM article WHERE id=${id}`;
    let result = await queryFn(sql)
    if(result.length==0){
        // 文章不存在
        ctx.body = returnMsg(2, "删除的文章不存在");
        return;
    }
    // 删除文章
    let sql1 = `DELETE FROM article WHERE id=${id}`;
    await queryFn(sql1);
    ctx.body = returnMsg(0, "删除成功");
})


module.exports = router;