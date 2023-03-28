module.exports = (app) => {
	app.use(async (ctx, next) => {
		let status = 0;
		try {
			await next();
			status = ctx.status;
		} catch (err) {
			status = 500;
		}
		if (status >= 400) {
			switch (status) {
				//请求错误
				case 400:
					status = 400;
					console.error('请求错误', status);
					ctx.body = {
						code: status,
						msg: '请求错误',
					};
					break;
				// 验证未授权
				case 401:
					status = 401;
					console.error('验证未授权', status);
					ctx.body = {
						code: status,
						msg: '验证未授权',
					};
					break;
				// 服务器拒绝请求
				case 403:
					status = 403;
					console.error('服务器拒绝请求', status);
					ctx.body = {
						code: status,
						msg: '服务器拒绝请求',
					};
					break;
				// 请求未找到
				case 404:
					status = 404;
					console.error('请求未找到', status);
					ctx.body = {
						code: status,
						msg: 'REQUEST_NOT_FOUND',
					};
					break;
				// 请求超时
				case 408:
					status = 408;
					console.error('请求超时', status);
					ctx.body = {
						code: status,
						msg: '请求超时',
					};
					break;
				// 资源已删除
				case 409:
					status = 409;
					console.error('资源已删除', status);
					ctx.body = {
						code: status,
						msg: '资源已删除',
					};
					break;
				// 服务器内部错误
				default:
					status = 500;
					console.error('服务器内部错误', status);
					ctx.body = {
						code: status,
						msg: '服务器内部错误',
					};
			}
		}
		ctx.response.status = status;
	});
};
