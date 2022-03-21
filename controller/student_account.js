const StudentAccount = require('../model/student_account');
const { send, Token, isEmpty } = require("../util");
const authOperate = require("./authOperate.js");

module.exports = {
	search: async (req, res) => {
		const { token, ...rest } = req.query
		const { expired } =  Token.decrypt(token);
		if (expired) return send({ res, message: "登录已经过期，请重新登录", status: -1 });
		const data = await StudentAccount.search(rest);
		send({ res, data: data.data, total: data.total });
	},
	add: async (req, res) => {
		const { token, ...rest } = req.body;
		authOperate({
			res, token, tips: "注册账号", useraccount: '@@@',
			async callback(e) {
				const isRegister = await StudentAccount.isRegister(req.body.student_no);
				if (isRegister) return send({ res, message: "账号已注册", status: -1 });
				let data = await StudentAccount.add(rest);
				send({ res, data, tips: "注册账号" });
				return 'end';
			}
		});
	},
	remove: async (req, res) => {
		const { token, student_no } = req.body;
		authOperate({
			res, token, tips: "删除账号", useraccount: '@@@',
			async callback(e) {
				let data = await StudentAccount.remove(student_no);
				send({ res, data });
				return 'end';
			}
		});
	},
	edit: async (req, res) => {
		const { token, student_no, ...rest } = req.body;
		authOperate({
			res, token, tips: "修改", useraccount: '@@@', student_no, 
			callback(e) {
				return StudentAccount.edit(rest, student_no);
			}
		});
	},
	reset: async (req, res) => {
		const { token, student_no, ...rest } = req.body;
		authOperate({
			res, token, tips: "重置", useraccount: '@@@',
			callback(e) {
				return StudentAccount.reset(student_no);
			}
		});
	},
	// 登录账号
	login: async (req, res) => {
		let { student_no, password } = req.body;
		let isRegister = await StudentAccount.isRegister(student_no);
		if (!isRegister) return send({ res, message: "账号不存在", status: -1 });
		let token = Token.encrypt({ useraccount: student_no });
		let data = await StudentAccount.verifyLogin({ student_no, password });
		if (!isEmpty(data)) return send({ res, message: "登录成功", data: { token, ...data },  status: 0 });
		send({ res, message: "密码错误", status: -1 });
	},
}

