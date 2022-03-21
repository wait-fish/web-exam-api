const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
module.exports = class News extends Model2 {

	// 添加
	static async add(params) {
		let row = await this.insertData(params);
		return this.returnData(row.affectedRows === 1);
	}
	
	// 删除
	static async remove(student_no) {
		let row = await this.deleteData(student_no, "student_no");
		return this.returnData(row.affectedRows);
	}
	
	// 查询数量
	static async count(student_no) {
		const data = await this.selectData({ student_no })
		return this.returnData(data.length);
	}
}