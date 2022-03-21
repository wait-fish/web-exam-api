const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
module.exports = class Score extends Model2 {

	// 查询 / 搜索选项
	static async search(params) {
		let { startIndex, endIndex, ...rest } = params;
		let row = await this.searchData(rest, {
			retcol: ['count(*) as count']
		});
		let limit = endIndex ? `${startIndex},${endIndex}` : '' ;
		let data = await this.searchData(rest, {
			limit,
			order: 'student_no desc'
		});
		return this.returnData({ data, total: row[0].count });
	}
	
	// 添加
	static async add(params) {
		var total = 1;
		if (params.hasOwnProperty('rows')) {
			await params.rows.forEach(async param => {
				let row = await this.insertData(param);
			})
			total = params.rows.length;
		} else {
			let row = await this.insertData(params);
			total = row.affectedRows === 1
		}
		return this.returnData({ total });
	}
	
	// 编辑
	static edit(params, s_id) {
		return this.returnData(this.updateData(params, { where: { s_id } }));
	}
	
	// 删除
	static async remove(s_id) {
		let row = await this.deleteData(s_id, "s_id");
		return this.returnData(row.affectedRows === 1);
	}
}