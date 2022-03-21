const User = require('../model/user.js');
const { send, Token, encryption, isEmpty } = require('../util');
const authOperate = require("./authOperate.js");

module.exports = {
	// 查询 / 搜索
	get: async (req, res) => {
		let data = await User.search(req.query);
		send({ res, data });
	},
	// 注册 or 添加账号
	register: async (req, res) => {
		let { token, useraccount, password, ...rest } = req.body;
		const { useraccount: account } = Token.decrypt(token);
		if (account !== 'admin') return send({ res, message: "没有权限", status: -1 });
		let isRegister = await User.isRegister(useraccount);
		if (isRegister) return send({ res, message: "账号已注册", status: -1 });
		password = encryption(password);
		let isAdd = await User.addUser({ useraccount, password, ...rest });
		if (isAdd) return send({ res, message: "注册成功", status: 0 });
		send({ res, message: "注册失败", status: -1 });
	},
	// 登录账号
  login: async (req, res) => {
		let { useraccount, password } = req.body;
		let isRegister = await User.isRegister(useraccount);
		if (!isRegister) return send({ res, message: "账号不存在", status: -1 });
		let token = Token.encrypt({ useraccount });
		password = encryption(password);
		let data = await User.verifyLogin({ useraccount, password });
		if (!isEmpty(data)) return send({ res, message: "登录成功", data: { token, ...data },  status: 0 });
		send({ res, message: "密码错误", status: -1 });
	},
	// 删除用户
	remove: (req, res) => {
		let { useraccount, token } = req.body;
		const { useraccount: account } = Token.decrypt(token);
		if (account !== 'admin') return send({ res, message: "没有权限", status: -1 });
		authOperate({
			res, token, tips: "删除", useraccount,
			callback() {
				return User.remove(useraccount)
			}
		});
	},
	// 编辑用户
	edit: async (req, res) => {
		let { useraccount, token, password, grade, ...rest } = req.body;
		authOperate({
			res, token, tips: "编辑", useraccount,
			callback(e) {
				password = encryption(password);
				grade = grade || e; // 如果没有传参则不修改
				// 等级是 超级管理员，但等级不符合要求
				if (e == 0 && (grade != 0 && grade != 1 && grade != 2)) return false;
				if (e == 1 && (grade != 1 && grade != 2)) return false;
				if (e == 2) return false;
				return User.edit({ password, grade, ...rest }, useraccount);
			}
		});
	},
}