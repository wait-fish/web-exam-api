const Model = require("./model");
const isEmpty = require('../util/is-empty.js');

// this.name 为js自带属性，类名
module.exports = class Model2 extends Model {
	static name = this.name;
	// 如果不在model继承则需要设置表名在controller
	static setTableName(name) {
		this.name = name;
	}
	
	/**
	 * 查询表
	 *  @param {Object} params 对象参数
	 * @param {Object} options 查询条件
	 * ->
	 * 	{
	 *		order: 'password desc',
	 *		limit: '0,1',
	 *    retcol: [] 返回字段数组
	 *	}
	 */
	static selectData(params = {}, options = {}) {
		let keyString = '';
		let valueArray = [];
		var { term, order, limit, retcol } = options;
		order = isEmpty(order) ? ' ' : ' order by ' + order;
		limit = isEmpty(limit) ? '' : ' limit ' + limit;
		retcol = isEmpty(retcol)? '*' : retcol.join();
		if (!isEmpty(params)) {
			// 键值数组
			let keyArray = Object.keys(params);
			keyString = keyArray.join(`=? ${term || 'and '}`) + '=?'; 
			// 获取到值数组
			valueArray = Object.values(params);
		}
		let sql = `select ${retcol} from ${this.name} where ${keyString || 1}${order}${limit}`;
		console.log(this.name + ':' + sql);
		let query = this.query(sql, valueArray);
		return this.returnData(query, '获取' + this.name  + '表数据失败：'); 
	}
	
	/**
	 * 删除数据
	 * @param {any} id 删除行的主键
	 * @param {String} colname 查找列的名称，默认id    
	 */
	static deleteData(id, colname = 'id') {
		let sql = `delete from ${this.name} where ${colname}=?`;
		console.log(this.name + ':' + sql);
		let query = this.query(sql, id);
		return this.returnData(query, '删除' + this.name + '表数据失败：');
	}
	
	/**
	 * 插入数据
	 * @param {Object} params 插入的数据对象 
	 */
	static insertData(params = {}) {
		let keyString = '';
		let valueArray = [];
		let keys = '';
		if (!isEmpty(params)) {
			keyString = Object.keys(params).join(', ');
			valueArray = Object.values(params);
			keys = Object.keys(params).fill('?').join(', ');
		}
		let sql = `insert into ${this.name}(${keyString}) values(${keys})`;
		this.logSQL(sql);
		let query = this.query(sql, valueArray);
		return this.returnData(query, '插入' + this.name  + '表数据失败：');
	}
	
	/**
	 * 更新数据
	 * @param {Object} params 更新参数
	 * @param {Object} options 选择条件
	 * ->
	 * 	 term 默认：'and' 条件拼接
	 * 	 where 默认无 条件语句
	 *   operate 默认=？ 修改还是加减值 
	 */
	static updateData(params = {}, options = {}) {
		let keyString = '';
		let valueArray = [];
		let whereVals = [];
		let { where, operate, term } = options;
		operate = operate ? operate : '=?' ;
		term = term ? term : 'and' ;
		if (!isEmpty(where)) {
			whereVals = Object.values(where);
			where = Object.keys(where).join(`=? ${term} `) + '=?';
		}
		if (!isEmpty(params)) {
			// 如果是 修改值就用分支1否则用分支2
			switch (operate) {
				case '=?':
					keyString = Object.keys(params).join('=?, ') + '=? ';
					break;
				default:
					keyString = Object.keys(params).map((item, index) => `${item}=${item}${operate}`).join();
			}
			// 处理条件部分
			valueArray = Object.values(params);
		}
		let sql = `update ${this.name} set ${keyString} where ${where}`;
		this.logSQL(sql);
		valueArray = [...valueArray, ...whereVals];
		let query = this.query(sql, valueArray);
		return this.returnData(query, '更新' + this.name  + '表数据失败：'); 
	}
	
	/**
	 * @param {Object} params 参数对象
	 * @param {Object} options 菜单对象
	 * -> 
	 * 	term 默认'and' 'or'
	 *  order 默认无 'id desc'  
	 */
	static searchData(params = {}, options = {}) {
		var { term, order, limit, retcol } = options;
		order = isEmpty(order) ? '' : ' order by ' + order;
		limit = isEmpty(limit) ? '' : ' limit ' + limit;
		retcol = isEmpty(retcol)? '*' : retcol.join();
		let valueArray = Object.values(params).map(item => ` like "%${item}%"`);
		let keyArray = Object.keys(params).map((item,index) => item + valueArray[index]);
		let where = !isEmpty(keyArray) ? 'where ' + keyArray.join(` ${term || 'and'} `) : ''; 
		let sql = `select ${retcol} from ${this.name} ${where}${order}${limit}`;
		this.logSQL(sql);
		let query = this.query(sql);
		return this.returnData(query, '搜索' + this.name  + '表数据失败：');
	}
	
	// 打印sql语句
	static logSQL(sql) {
		console.log(this.name + ':' + sql);
	}
	
	// 查询数量
	static countData(param) {
		let sql = `select COUNT(distinct ${param}) as count from ${this.name}`;
		this.logSQL(sql);
		return this.returnData(this.query(sql), '统计' + this.name  + '表数据失败：');
	}
}