const Router = require('koa-router')
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require("../../../utils")

// 根据前端传过来的id获取文章 /article/info/{id}
router.get('/:id', async ctx=>{
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2, "查询用户信息失败", "token过期或该用户不存在");
        return;
    }
    // 得到前端传过来的id
    let id = ctx.url.split('/')[ctx.url.split('/').length-1]
    // 到数据库中搜索id对应的文章
    let sql = `SELECT * FROM article WHERE id=${id}`;
    let result = await queryFn(sql)
    if(result.length>0){
        ctx.body = returnMsg(0, "请求成功",result[0]);
    }else{
        ctx.body = returnMsg(1, "该文章已不存在");
    }
})

module.exports = router;