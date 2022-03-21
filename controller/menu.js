const Menu = require('../model/menu.js');
const { send } = require('../util');
const authOperate = require("./authOperate.js");

module.exports = {
	search: async (req, res) => {
		let data = await Menu.search(req.query);
		data = merge(data, "specialty");
		data = data.map(item => {
			item.children = merge(item.children, "year");
			return item;
		});
		send({ res, data });
	},
	add: async (req, res) => {
		let { token, ...rest } = req.body;
		authOperate({
			res, token, tips: "添加", useraccount: '@@@',
			async callback(e) {
				const isExist = await Menu.search(rest);
				if (isExist.length) return send({ res, status: -1, message: '已经存在' });
				return Menu.add(rest);
			}
		});
	},
	remove: async (req, res) => {
		let { token, ...rest } = req.body;
		let data = await Menu.remove(rest);
		send({ res, data });
	},
	// 菜单构造
	select: async (req, res) => {
		let data = await Menu.search(req.query);
		data = merge(data, "specialty");
		data.map((item, index) => {
			item.value = index;
			item.label = item.specialty;
			delete item.specialty;
			return item;
		})
		data = data.map(item => {
			item.children = merge(item.children, "year");
			item.children.map((item, index) => {
				item.value = index;
				item.label = item.year;
				delete item.year;
				item.children.map((item, index) => {
					item.value = index;
					item.label = item.class;
					delete item.class;
					return item;
				});
				return item;
			});
			return item;
		});
		send({ res, data });
	}
}
// 合并
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
