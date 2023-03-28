/**
 * 这里实现路由router的自动装载路由
 */

const fs = require('fs');
const Router = require('koa-router');
const path = require('path');
const router = new Router();
// 获取router路径
const newRouterFile = path.join(__dirname, '../routers');
// 自动装载路由
const loadRouters = (newRouterFile) => {
	// 读取router路径下的文件及文件夹
	fs.readdirSync(newRouterFile).forEach((file) => {
		// 拼接路径
		let newFilePath = path.join(newRouterFile, file);
		// 判断是目录还是文件
		if (fs.statSync(newFilePath).isDirectory()) {
			// 文件夹继续遍历
			loadRouters(newFilePath);
		} else {
			// 文件装载路由
			let route = require(newFilePath);
			router.use(route.routes());
			router.use(route.allowedMethods());
		}
	});
};
loadRouters(newRouterFile);

module.exports = router;
