const Router = require('koa-router');
const router = new Router({ prefix: '/' });

router.get('test', (ctx, next) => {
	ctx.body = {
		code: 200,
		msg: '这是测试接口',
	};
});

module.exports = router;
