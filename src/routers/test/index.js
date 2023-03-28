const Router = require('koa-router');
const { logger } = require('../../utils/logger');
const router = new Router({ prefix: '/' });

router.get('test', (ctx, next) => {
	ctx.body = {
		code: 404,
		msg: '这是测试接口',
	};
});

module.exports = router;
