const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
module.exports = class Exam_type extends Model2 {

	// 查询 / 搜索选项
	static async search(params) {
		return this.returnData(this.searchData(params));
	}
	
	// 添加选项
	static async add(exam_type) {
		await this.insertData({ exam_type, exam_level: '初级' });
		await this.insertData({ exam_type, exam_level: '中级' });
		await this.insertData({ exam_type, exam_level: '高级' });
		return this.returnData(true);
	}
	
	// 删除选项
	static async remove(params) {
		let keys = Object.keys(params);
		let vals = Object.values(params);
		let where = keys.map((item, index) => `${item}='${vals[index]}'`).join(' and ');
		let sql = `delete from ${this.name} where ${where}`;
		this.logSQL(sql);
		let row = await this.query(sql);
		return this.returnData(row.affectedRows === 1);
	}
	
	// 数量
	static count() {
		return this.countData('exam_type');
	}
}