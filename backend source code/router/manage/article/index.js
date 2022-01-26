const Router = require('koa-router')
const router = new Router();
const list = require("./list")
const info = require("./info")
const edit = require("./edit")
const add = require("./add")
const delete1 = require("./delete")
// const { returnMsg, queryFn, jwtVerify } = require("../../../utils")

router.use('/list', list.routes(), list.allowedMethods());
router.use('/info', info.routes(), info.allowedMethods());
router.use('/edit', edit.routes(), edit.allowedMethods());
router.use('/delete', delete1.routes(), delete1.allowedMethods());
router.use('/add', add.routes(), add.allowedMethods());

module.exports = router;