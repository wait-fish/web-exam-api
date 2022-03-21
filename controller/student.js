const Student = require('../model/student.js');
const User = require('../model/user.js');
const { send, delFile } = require('../util');
const authOperate = require("./authOperate.js");

module.exports = {
	search: async (req, res) => {
		const { token, ...params } = req.body;
		const data = await Student.search(params);
		send({ res, data: data.data, total: data.total });
	},
	add: async (req, res) => {
		const { token, student_no,  ...rest } = req.body;
		authOperate({
			res, token, tips: "报名", useraccount: '@@@', student_no,
			async callback(e) {
				let data = await Student.add({ student_no, ...rest });
				send({ res, data });
				return 'end'
			}
		});
	},
	edit: async (req, res) => {
		const { token, s_id, student_no, registration_time, ...rest } = req.body;
		authOperate({
			res, token, tips: "编辑", useraccount: '@@@', student_no,
			callback(e) {
				return Student.edit({ student_no, ...rest }, s_id);
			}
		});
	},
	remove: async (req, res) => {
		const { token, s_id } = req.body;
		authOperate({
			res, token, tips: "删除", useraccount: '@@@',
			async callback(e) {
				let url = await Student.selectUrl(s_id);
				let data = await Student.remove(s_id);
				if (data) delFile(url);
				return data;
			}
		});
	}, // 查询数量
	count: async (req, res) => {
		const { year, type } = req.query;
		let data = await Student.count(year);
		send({ res, data: {
			count: data.length
		} });
	}, // 近5年考试人数
	exam_number: async (req, res) => {
		let data = await Student.yearData({
			year: new Date().getFullYear(), 
			specialty: req.query.specialty
		});
		var temp1 = [];
		var temp2 = [];
		// console.log(data);
		data.forEach(item => {
			index = temp1.findIndex(v => item.year === v);
			if (index === -1) {
				temp1.push(item.year);
				temp2.push(1);
			} else temp2[index] += 1;
		})
		send({ res, data: [temp1, temp2] });
	},
	// 某个区间的人数
	date_count: async (req, res) => {
		let data = await Student.dateCount(req.query);
		send({ res, data: data[0] });
	}
}
