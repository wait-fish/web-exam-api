const jwt = require("jsonwebtoken");

const Token = {
	// 加密 
	/**
	 * @param {Object} data { useraccount: "useraccount" } 
	 * @param {number} n 小时
	 */
	encrypt(data, n = 5) {
		// 创建时间 秒                 60s * nm 
		let expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * n;
		return jwt.sign(data, 'token', {
			expiresIn: expirationTime
		});
	},
	// 解密
	decrypt(token) {
		try {
			// iat是生成时间
			// 过期时间（exp - iat）
			// { **: '456', iat: 1641452295, exp: 3282922590 }
			let { iat, exp, ...rest  } = jwt.verify(token, "token");
			let expired = new Date().getTime() >= new Date((exp-iat)*1000).getTime();
			return { expired, ...rest }
		} catch (e) {
			return {
				expired: true,
				data: e
			}
		}
	}
}
module.exports = Token;