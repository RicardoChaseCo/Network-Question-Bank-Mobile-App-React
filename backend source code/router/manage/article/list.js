const Router = require('koa-router')
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require("../../../utils")

// 文章列表    /article/list
router.post('/', async ctx=>{
    // 得到数据库中到底有多少篇文章(total)
    let sql = `SELECT COUNT(*) ROWS FROM article`;
    let result = await queryFn(sql);
    let total = result[0].ROWS;
    // 获取前端传过来的当前页码(current)和每页显示个数(counts)
    let {current, counts} = ctx.request.body;
    // 确认前端传了这两个参数
    if(!current || !counts){
        ctx.body = returnMsg(1, "参数错误");
        return;
    }
    // 去数据库查询对应的10条数据给前端
    /* 
        前端是传页码过来的  1,2,3,4,5
        第1页的数据 ：  index = 0    (current-1)*10=0     -> 0~9      
        第2页的数据 ：  index = 10   (current-1)*10=10     -> 10~19
        第3页的数据：   index = 20   (current-1)*10=20     -> 20~29
    */
    let sql1 = `SELECT id,title,subTitle,date FROM article LIMIT ${(current-1)*counts},${counts}`;
    let result1 = await queryFn(sql1);  // 得到10项数据的数组

    ctx.body = returnMsg(0, "分页查询成功", {
        current,counts,total,
        arr: result1
    });
    // let sql = `SELECT id,title,subTitle,date FROM article`;
    // let result = await queryFn(sql)
    // ctx.body = returnMsg(0, "文章列表获取成功", result);
})

module.exports = router;