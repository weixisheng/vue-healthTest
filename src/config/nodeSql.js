let mysql = require('mysql');
let express = require('express');
let http = require('http');
let url = require('url');
let util = require('util');
let querystring = require('querystring');
let TABLE = 'member';
let app = express();
//创建连接  
let client = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'makefriend',
	port: 3306
});

client.connect();
/*登录*/
let selectSql = `SELECT password FROM ${TABLE} WHERE username=?`;
let selectParams = [];
app.get('/login', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf8'
	});
	let params = url.parse(req.url, true).query;
	selectParams = [params.username];
	client.query(selectSql, selectParams, function(err, results) {
		if (err) {
			res.write("fail:no such username");
			return;
		}
		if (results) {
			// console.log(JSON.parse(JSON.stringify(results))[0].password)
			res.write(JSON.parse(JSON.stringify(results))[0].password);
		}
		res.end();
	});
});
/*注册*/
let insertSql = `INSERT INTO ${TABLE} (username,password) VALUES(?,?)`;
let insertParams = [];
app.post('/register', (req, res) => {
	let post = '';
	req.on('data', function(chunk) {
		post += chunk;
	});
	req.on('end', function() {
		post = querystring.parse(post);
		res.writeHead(200, {
			'Content-Type': 'text/html; charset=utf8'
		});
		insertParams = [post.username, post.password];
		client.query(insertSql, insertParams, function(err, results) {
			if (err) {
				throw err;
			}
			console.log('插入成功');
			res.write('注册成功');
			res.end();
			// client.end();
		});
	});
});
app.listen(81);
console.log('listening port 81');