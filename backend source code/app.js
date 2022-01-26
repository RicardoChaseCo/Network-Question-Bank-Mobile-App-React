// node的项目基本都是使用require引入
const Koa = require("koa2")
const Router = require('koa-router')
const app = new Koa()
const bodyParser = require('koa-bodyparser');
const router = new Router()
const {port, host} = require("./utils")
const manage = require("./router/manage")
const web = require("./router/web")
const nomatch = require("./router/nomatch")
// 引入koa2-cors中间件
const cors = require("koa2-cors");
// 引入koa-static中间件
const static = require("koa-static")
const path = require("path")

router.get('/', async ctx=>{
    ctx.body = "首页数据"
})

router.use("/manage", manage.routes(), manage.allowedMethods())
router.use("/web", web.routes(), web.allowedMethods())
router.use("/404", nomatch.routes(), nomatch.allowedMethods())
// 如果前端请求了/路径，那么重定向到/manage，让前端请求/manage的接口数据
// router.redirect("/", "/manage")

// 前端随意的请求一个地址，我们都给他重定向到/404
app.use(async (ctx, next)=>{
    await next();   // 放行下一个中间件
    // 一旦状态码为404，就重定向到/404路径
    if(parseInt(ctx.status)===404){
        // ctx.body => ctx.response.body的简写
        ctx.response.redirect('/404')   // 重定向到/404
    }
})

app.use(cors({
    origin: function(ctx){
        if(ctx.url==='/manage/upload'){
            return "*"
        }
    }
}));    // 允许跨域
app.use(bodyParser());	// bodyParser
app.use(router.routes(), router.allowedMethods());
// 读取静态资源的中间件要写在路由的后面   path.join(__dirname, "../../")
// 在页面中如何读取404.png ? -    http://localhost:9000/images/404.png
app.use(static( path.join(__dirname, "static") ))
app.use(static( path.join(__dirname, "router/manage/upload") ))


app.listen(port, ()=>{
    console.log(`Server is running at ${host}:${port}`)
})

/* 
    axios.get('/').then(res=>{})
    后端的路由就是前端的接口地址
*/