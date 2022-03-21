const User = require("../model/user.js");
const { send, Token } = require("../util");

// token, useraccount, callback（必须有返回值）, tips: "操作"
// @@@ 留后门给没有操作useraccount的鉴权操作
module.exports = async ({ res, token, callback, tips, useraccount = '', student_no = '' }) => {
	tips = tips || "操作";
	let { expired, useraccount: loginUseraccount } =  Token.decrypt(token);
	if (expired) return send({ res, message: "登录已经过期，请重新登录", status: -1 });
	// if (useraccount === "admin") return send({ res, message: "无权限执行该操作", status: -1 });
	const grade = await User.auth(loginUseraccount);
	if ((grade === 1 && (useraccount === loginUseraccount || useraccount === '@@@') ) || grade === 0 || (student_no === loginUseraccount && useraccount === '@@@')) {
		let isOK = await callback(grade);
		if (isOK === 'end') return;
		if (isOK) return send({ res, message: tips + "成功", status: 0 });
		return send({ res, message: tips + "失败", status: -1 });
	}
	send({ res, message: "无权限执行该操作", status: -1, data:[] });
}