const Router = require('koa-router')
const router = new Router()
const { returnMsg, queryFn } = require("../../utils")

router.get('/', async ctx=>{
    ctx.body = "官网数据"
})

// 导航接口
router.get('/nav', async ctx=>{
    let sql = `SELECT * FROM nav`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0, "请求成功", result)
})

// 焦点图接口
router.get('/banner', async ctx=>{
    let sql = `SELECT * FROM banner`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0, "请求成功", result)
})

// 获取文章列表
router.get('/list', async ctx=>{
    let sql = `SELECT id,title,author,date FROM article`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0, "请求成功", result)
})

// 根据id获取文章内容
router.get('/article', async ctx=>{
    let id = ctx.request.query.id;
    let sql = `SELECT * FROM article WHERE id=${id}`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0, "请求成功", result[0]);
})

module.exports = router;