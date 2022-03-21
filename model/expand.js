const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");

module.exports = class Expand extends Model2 {

	// 查询 / 搜索选项
	static async select() {
		return this.returnData(this.selectData());
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
			retcol: ['img_url']
		});
		return this.returnData((row[0] && row[0].img_url) || false);
	}
	// 编辑
	static edit(params, id) {
		return this.returnData(this.updateData(params, { where: { id } }));
	}
}