const Fund = require('../model/fund.js');
const { send } = require('../util');
const authOperate = require("./authOperate.js");

module.exports = {
	search: async (req, res) => {
		let data = await Fund.search(req.query);
		send({ res, data });
	},
	add: async (req, res) => {
		const { token, ...rest } = req.body;
		authOperate({
			res, token, tips: "添加", useraccount: '@@@',
			async callback(e) {
				let data = await Fund.add(rest);
				send({ res, data });
				return 'end'
			}
		});
	},
	edit: async (req, res) => {
		const { token, order_id, edit_time, ...rest } = req.body;
		authOperate({
			res, token, tips: "编辑", useraccount: '@@@',
			callback(e) {
				return Fund.edit(rest, order_id);
			}
		});
	},
	remove: async (req, res) => {
		const { token, order_id } = req.body;
		authOperate({
			res, token, tips: "删除", useraccount: '@@@',
			callback(e) {
				return Fund.remove(order_id);
			}
		});
	}
}

