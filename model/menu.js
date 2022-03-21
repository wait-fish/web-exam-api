const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
module.exports = class Menu extends Model2 {

	// 查询 / 搜索选项
	static async search(params) {
		return this.returnData(this.searchData(params));
	}
	
	// 添加选项
	static async add(params) {
		let row = await this.insertData(params);
		return this.returnData(row.affectedRows === 1);
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
}