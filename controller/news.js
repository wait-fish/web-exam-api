const News = require('../model/news.js');
const { send } = require('../util');

module.exports = {
	add: async (req, res) => {
		const data = await News.add(req.body);
		send({ res, data });
	},
	remove: async (req, res) => {
		const { student_no } = req.body;
		const data = await News.remove(student_no);
		send({ res, data });
	},
	count: async (req, res) => {
		const { student_no } = req.query;
		const data = await News.count(student_no);
		send({ res, data: { count: data } });
	}
}

