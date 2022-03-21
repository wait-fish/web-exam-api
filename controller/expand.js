const Expand = require('../model/expand.js');
const { send, delFile } = require('../util');
const authOperate = require("./authOperate.js");

module.exports = {
	select: async (req, res) => {
		let data = await Expand.select();
		send({ res, data });
	},
	add: async (req, res) => {
		const { token, ...rest } = req.body;
		authOperate({
			res, token, tips: "添加导航", useraccount: '@@@',
			async callback(e) {
				let data = await Expand.add(rest);
				send({ res, data });
				return 'end';
			}
		});
	},
	remove: async (req, res) => {
		const { token, id } = req.body;
		authOperate({
			res, token, tips: "删除导航", useraccount: '@@@',
			async callback(e) {
				let url = await Expand.selectUrl(id);
				let data = await Expand.remove(id);
				if (data) delFile(url);
				send({ res, data });
				return 'end';
			}
		});
	},
	edit: async (req, res) => {
		const { token, id, ...rest } = req.body;
		authOperate({
			res, token, tips: "编辑", useraccount: '@@@',
			async callback(e) {
				let url = await Expand.selectUrl(id);
				if (url !== rest.img_url) delFile(url);
				return Expand.edit(rest, id);
			}
		});
	}
}

