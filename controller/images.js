const Images = require('../model/images.js');
const { send, delFile } = require('../util');
const merge = require('../util/merge.js');
const authOperate = require("./authOperate.js");

module.exports = {
	select: async (req, res) => {
		// 0 / 1 ,1取前三张
		const { crop } = req.query;
		let data = await Images.select(crop);
		send({ res, data });
	},
	add: async (req, res) => {
		const { token, ...rest } = req.body;
		authOperate({
			res, token, tips: "上传图片", useraccount: '@@@',
			async callback(e) {
				let data = await Images.add(rest);
				send({ res, data });
				return 'end';
			}
		});
	},
	remove: async (req, res) => {
		const { token, id } = req.body;
		authOperate({
			res, token, tips: "删除图片", useraccount: '@@@',
			async callback(e) {
				let url = await Images.selectUrl(id);
				let data = await Images.remove(id);
				if (data) delFile(url);
				send({ res, data });
				return 'end';
			}
		});
	}
}

