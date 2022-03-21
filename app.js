const express = require("express");
const app = express();
const bodyParse=require('body-parser');
const multipart = require('connect-multiparty');
const port = 80;

// 上传文件
app.use(multipart({ uploadDir: './assets/upload' }));
// 解析post请求
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());
// 解决跨域
app.use(require("./miaddleware/header"));
// assets 公开资源，路径不用接上assets
app.use(express.static('assets'));
app.use(require('./router'));

app.get("/", (req, res) => res.send("web-exam-management-api,hello!"));

app.listen(port, () => console.log(`http://localhost:${port}`));
// 超级管理员账号
// admin
// admin