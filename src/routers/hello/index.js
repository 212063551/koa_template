const Router = require('koa-router');

const router = new Router({ prefix: '/' });

router.get('/', async (ctx, next) => {
	await ctx.render('index', {
		code: 200,
		title: 'hello kao2',
		Introduction: '这是我搭建的koa_cli',
	});
});

module.exports = router;
