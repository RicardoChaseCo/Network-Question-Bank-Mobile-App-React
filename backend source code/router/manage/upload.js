const Router = require('koa-router')
const router = new Router();
const jwt = require('jsonwebtoken');
const { returnMsg, queryFn, jwtVerify } = require("../../utils")
const multer = require("@koa/multer")
const path = require("path")


// 存储文件的名称
let myFileName = ""

const storage = multer.diskStorage({
    destination: path.join(__dirname, "upload/"),
    filename: (req, file, cb) => {
        myFileName = `${file.fieldname}-${Date.now().toString(16)}.${file.originalname.split('.').splice(-1)}`
        cb(null, myFileName)
    }
})

// 限制大小
const limits = {
    fieldSize: 1024 * 200,   // 200kb
    fields: 1,
    files: 1
}

let upload = multer({ storage, limits });


router.post('/', upload.single('avatar'), async ctx=>{
    let token = ctx.request.headers['cms-token'];
    // 鉴权
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2, "查询用户信息失败", "token过期或该用户不存在");
        return;
    }
    // 修改数据库
    // 鉴权成功，修改token对应数数据的avatar字段
    let sql = `UPDATE user SET avatar='${myFileName}' WHERE token='${token}'`
    await queryFn(sql);

    // 重新查找这条数据，并且返回给前端
    let sql1 = `SELECT username,avatar,token FROM user WHERE token='${token}'`;
    let result = await queryFn(sql1);

    ctx.body = returnMsg(0, "修改成功", {
        avatar: result[0].avatar,
        username: result[0].username,
        "cms-token": result[0].token
    });
})

module.exports = router;