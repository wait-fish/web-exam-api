const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");

module.exports = class Data_files extends Model2 {

	// 查询 / 搜索选项
	static async select(crop = 0) {
		let opt = {	order: 'update_time desc'};
		if (crop == 1) opt.limit = '0,8';
		return this.returnData(this.selectData({}, opt));
	}
	// 添加
	static async add(params) {
		let row = await this.insertData(params);
		return this.returnData(row.affectedRows === 1);
	}
	// 删除
	static async remove(id) {
		let row = await this.deleteData(id, "id");
		return this.returnData(row.affectedRows === 1);
	}
	// 查询路径
	static async selectUrl(id) {
		let row = await this.selectData({ id }, {
			retcol: ['data_url']
		});
		return this.returnData((row[0] && row[0].data_url) || false);
	}
}