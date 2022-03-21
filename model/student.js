const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
module.exports = class Student extends Model2 {

	// 查询 / 搜索选项
	static async search(params = {}) {
		let { startIndex, endIndex, ...rest } = params;
		let row = await this.searchData(rest, {
			retcol: ['count(*) as count']
		});
		let limit = endIndex ? `${startIndex},${endIndex}` : '' ;
		let data = await this.searchData(rest, {
			limit,
			order: 'registration_time desc'
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
	
	// 数量
	static count(year) {
		if (isEmpty(year)) return this.selectData();
		else return this.selectData({ year });
	}
	
	// 查询到某年之前的
	static yearData({ year, specialty }) {
		let sql = `select year from student where year > '${Number(year) - 5}' and year <= '${year}' ${specialty ? 'and specialty ="' + specialty + '"' : ''}`;
		this.logSQL(sql);
		return this.query(sql);
	}
	
	// 查询某个时间区间的人数
	static dateCount(params) {
		let sql = `SELECT COUNT(*) as count from student WHERE registration_time >= '${params.startDate}' and registration_time <= '${params.endDate}'`;
		this.logSQL(sql);
		return this.query(sql);
	}
	
	// 查询路径
	static async selectUrl(id) {
		let row = await this.selectData({ id }, {
			retcol: ['img_src']
		});
		return this.returnData((row[0] && row[0].img_src) || false);
	}
}