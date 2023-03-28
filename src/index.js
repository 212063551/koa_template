const app = require('./server/www.js');

const port = 3000;

app.listen(port, () => {
	console.log(`http server url : http://localhost:${port}`);
});
