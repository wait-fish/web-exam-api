const path = require("path");
const fs = require("fs");
const send = require('../util/send.js');

module.exports = (req, res) => {
	// console.log(req);
	if (req.files.hasOwnProperty("file")) {
		let { file } = req.files;
		let url = file.path.replace("assets\\", "");
		send({ res, message: "上传成功", url});
	} else send({ res, message: "上传失败" });
}