const crypto = require("crypto");
// 密码加密
module.exports = function encryption(password) {
	let ID = "waitFish";
	let md5 = crypto.createHash("md5");
	if (!!password) return md5.update(password + ID).digest("hex");
}