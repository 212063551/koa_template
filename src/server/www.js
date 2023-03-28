const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const _static = require('koa-static');
const cors = require('@koa/cors');
const koaBody = require('koa-body').default;
const UserRouter = require('../utils/router.js');
const errorHandler = require('../middlewares/errorHandler');

const app = new Koa();
errorHandler(app);

app.use(
	cors({
		//设置允许来自指定域名请求
		origin: (ctx) => {
			return '*'; // 允许来自所有域名请求
		},
		maxAge: 5, //指定本次预检请求的有效期，单位为秒。
		credentials: true, //是否允许发送Cookie
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
	})
);
app.use(_static('./public'));
app.use(views(path.join(__dirname, '../views'), { extension: 'ejs' }));
app.use(
	koaBody({
		multipart: true,
		formidable: {
			// uploadDir: path.join(__dirname, '../uploadDir'),
			maxFileSize: 5 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M,这里设置为5M
			keepExtensions: true,
		},
		parsedMethods: ['POST', 'PUT', 'GET', 'DELETE'],
	})
);
app.use(UserRouter.allowedMethods());
app.use(UserRouter.routes());
app.on('error', (err) => {
	logger.error(err);
});
module.exports = app;
