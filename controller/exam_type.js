const ExamType = require('../model/exam_type.js');
const { send } = require('../util');
const authOperate = require("./authOperate.js");

module.exports = {
	search: async (req, res) => {
		let data = await ExamType.search(req.query);
		data = merge(data, "exam_type");
		send({ res, data });
	},
	add: async (req, res) => {
		let { token, exam_type } = req.body;
		authOperate({
			res, token, tips: "添加", useraccount: '@@@',
			async callback(e) {
				const isExist = await ExamType.search({exam_type});
				if (isExist.length) return send({ res, status: -1, message: '已经存在' + exam_type });
				return ExamType.add(exam_type);
			}
		});
	},
	remove: async (req, res) => {
		let { token, ...rest } = req.body;
		let data = await ExamType.remove(rest);
		send({ res, data });
	},
	select: async (req, res) => {
		let data = await ExamType.search(req.query);
		data = merge(data, "exam_type");
		data.map((item, index) => {
			item.value = index;
			item.label = item.exam_type;
			delete item.exam_type;
			item.children.map((item, index) => {
				item.value = index;
				item.label = item.exam_level;
				delete item.exam_level;
				return item;
			});
			return item;
		});
		send({ res, data });
	},
	count: async (req, res) => {
		let data = await ExamType.count();
		send({ res, data: data[0] });
	}
}

function merge(data, keyName) {
	let tmpArr = [];
	data.forEach(item => {
		// 如果存在该对象
		let index = tmpArr.findIndex(a => a[keyName] === item[keyName]);
		if ( index === -1) {
			let obj = {};
			obj[keyName] = item[keyName];
			// obj.label = item[keyName];
			obj.children = [item];
			tmpArr.push(obj);
		} else tmpArr[index].children.unshift(item); // 头插入保证最新的在前面
		delete item[keyName]
	});
	return tmpArr;
}
