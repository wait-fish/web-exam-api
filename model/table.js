const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
const { database } = require("../util/sqlInfo.js");

module.exports = class User extends Model2 {

	// 获取表所有列
	static async getCols(tableName) {
		let sql = `select COLUMN_NAME from information_schema.COLUMNS where table_name = ? and table_schema = '${database}';`
		this.logSQL(sql);
		return this.returnData(this.query(sql, tableName));
	}

}