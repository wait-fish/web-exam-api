const DataFiles = require('../model/data_files.js');
const { send, delFile } = require('../util');
const merge = require('../util/merge.js');
const authOperate = require("./authOperate.js");

module.exports = {
	select: async (req, res) => {
		const { crop } = req.query;
		let data = await DataFiles.select(crop);
		send({ res, data:merge(data, 'year') });
	},
	add: async (req, res) => {
		const { token, ...rest } = req.body;
		authOperate({
			res, token, tips: "上传", useraccount: '@@@',
			async callback(e) {
				let data = await DataFiles.add(rest);
				send({ res, data });
				return 'end';
			}
		});
	},
	remove: async (req, res) => {
		const { token, id } = req.body;
		authOperate({
			res, token, tips: "删除文件", useraccount: '@@@',
			async callback(e) {
				let url = await DataFiles.selectUrl(id);
				let data = await DataFiles.remove(id);
				if (data) delFile(url);
				send({ res, data });
				return 'end';
			}
		});
	}
}

