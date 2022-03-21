const Model2 = require("./model2");
const isEmpty = require("../util/is-empty.js");
module.exports = class User extends Model2 {

	// 是否注册
	static async isRegister(useraccount) {
		return this.returnData(!isEmpty(await this.selectData({ useraccount })));
	}
	
	// 添加用户
	static async addUser(params) {
		let row = await this.insertData(params);
		return this.returnData(row.affectedRows === 1);
	}
	
	// 登录校验
	static async verifyLogin(params) {
		const rows = await this.selectData(params, { retcol: ["useraccount","grade", "remark"] });
		return this.returnData(rows[0] || rows);
	}
	
	// 判断权限
	static async auth(useraccount) {
		let row = (await this.selectData({useraccount}, { retcol: ["grade"] }))[0] || {grade: 2};
		return this.returnData(row.grade);
	}
	
	// 删除用户
	static async remove(useraccount) {
		let row = await this.deleteData(useraccount, "useraccount");
		return this.returnData(row.affectedRows === 1);
	}
	
	// 编辑用户
	static async edit(params, useraccount) {
		if (isEmpty(params.password)) delete params.password;
		let row = await this.updateData(params, { where: { useraccount } });
		return this.returnData(row.affectedRows === 1);
	}
	
	// 查询 / 搜索用户
	static async search(params, options) {
		return this.returnData(this.searchData(params, {  
			retcol: ['useraccount', 'grade', 'remark'],
			term: 'or', 
			...options 
			}));
	}
}