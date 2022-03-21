const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
module.exports = class Student_account extends Model2 {

	// 查询 / 搜索
	static async search(params) {
		let { startIndex, endIndex, keywords, ...rest } = params;
		let cols = keywords ? {	student_no: keywords, name: keywords } : {};
		let row = await this.searchData(cols, {
			retcol: ['count(*) as count'],
			order: 'student_no desc',
			term: 'or'
		});
		let limit = endIndex ? `${startIndex},${endIndex}` : '' ;
		let data = await this.searchData(cols, {
			limit,
			order: 'student_no desc',
			term: 'or'
		});
		return this.returnData({ data, total: row[0].count });
	}
	
	// 添加
	static async add(params) {
		var total = 0;
		if (params.hasOwnProperty('rows')) {
			for (let param of params.rows) {
				const isRegister = await this.isRegister(param.student_no);
				if (!isRegister) {
					param.password = param.password?.trim() ? param.password : "123456";
					let row = await this.insertData(param);
					if (row?.affectedRows == 1) ++total;
				}
			}
		} else if (!await this.isRegister(params.student_no)) {
			params.password = params.password || "123456";
			let row = await this.insertData(params);
			total = row?.affectedRows || 0;
		}
		return this.returnData({ total });
	}
	
	// 编辑
	static edit(params, student_no) {
		return this.returnData(this.updateData(params, { where: { student_no } }));
	}
	
	// 删除
	static async remove(student_no) {
		let row = await this.deleteData(student_no, "student_no");
		return this.returnData(row.affectedRows === 1);
	}
	
	// 重置密码
	static async reset(student_no) {
		return this.returnData(this.updateData({ password: '123456' }, { where: { student_no } }));
	}
	
	// 是否注册
	static async isRegister(student_no) {
		return this.returnData(!isEmpty(await this.selectData({ student_no })));
	}
	
	// 登录校验
	static async verifyLogin(params) {
		const rows = await this.selectData(params, { retcol: ["student_no", "name"] });
		return this.returnData(rows[0] || rows);
	}
}