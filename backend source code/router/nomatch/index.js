const Router = require('koa-router')
const router = new Router();
const fs = require("fs")
const path = require("path")
const mime = require("mime-types")

// /404
router.get('/', async ctx=>{
    let filePath = path.join(__dirname, "../../static/images/404.png")
    // 同步读取文件
    let file = fs.readFileSync(filePath)
    // 根据读取到的文件到底是什么类型
    let mimeTypes = mime.lookup(filePath)
    // 设置content-type是什么类型
    ctx.set("content-type", mimeTypes)
    ctx.body = file;
})

module.exports = router;