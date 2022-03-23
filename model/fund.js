const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
module.exports = class Fund extends Model2 {

	// 查询 / 搜索
	static async search(params) {
		return this.returnData(this.searchData(params, {
			order: 'order_id desc'
		}));
	}
	
	// 添加
	static async add(params) {
		let row = await this.insertData(params);
		return this.returnData(row.affectedRows === 1);
	}
	
	// 编辑
	static edit(params, order_id) {
		return this.returnData(this.updateData(params, { where: { order_id } }));
	}
	
	// 删除
	static async remove(order_id) {
		let row = await this.deleteData(order_id, "order_id");
		return this.returnData(row.affectedRows === 1);
	}
	
}