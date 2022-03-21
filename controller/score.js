const Score = require('../model/Score.js');
const { send } = require('../util');
const authOperate = require("./authOperate.js");

module.exports = {
	search: async (req, res) => {
		const { token, ...params } = req.body;
		const data = await Score.search(params);
		send({ res, data: data.data, total: data.total });
	},
	add: async (req, res) => {
		const { token, ...rest } = req.body;
		authOperate({
			res, token, tips: "添加", useraccount: '@@@',
			async callback(e) {
				let data = await Score.add(rest);
				send({ res, data });
				return 'end'
			}
		});
	},
	edit: async (req, res) => {
		const { token, s_id, registration_time, ...rest } = req.body;
		authOperate({
			res, token, tips: "编辑", useraccount: '@@@',
			callback(e) {
				return Score.edit(rest, s_id);
			}
		});
	},
	remove: async (req, res) => {
		const { token, s_id } = req.body;
		authOperate({
			res, token, tips: "删除", useraccount: '@@@',
			callback(e) {
				return Score.remove(s_id);
			}
		});
	},
	passed_rate: async (req, res) => {
		const { type, ...params } = req.query;
		let data = await Score.search(params);
		let passCount = 0;
		let notPassCount = 0;
		data.data.map(item => {
			switch(type) {
				case 'theory':
					if (item.theory >=60) ++passCount;
					else ++notPassCount;
				break;
				case 'practice':
					if (item.practice >= 60) ++passCount;
					else ++notPassCount;
				break;
				default:
					if (item.theory >=60 && item.practice >= 60) ++passCount;
					else ++notPassCount;
			}
			
		});
		send({ res, data: [{ value: passCount, name: '通过' },{ value: notPassCount, name: '不通过'}] });
	},
}
