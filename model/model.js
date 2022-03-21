const mysql = require("mysql2");

module.exports = class Model {
  static connect = null;
	// 默认查询所有的数据
	static sql = `select * from ${this.name}`;
	
  // 连接数据库
  static connection() {
    Model.connect = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "db_student_examination_system"
    });
    Model.connect.connect(err => {
      if (err) console.log(`数据库连接失败${err}`);
    });
  } 

  // 关闭数据库连接
  static end() {
    if (!Model.connect) Model.connect.end();
  }

  /**
   * 通用查询
   * @param {string} sql 执行的sql语句
   * @param {Array} params 给SQL语句的占位符进行赋值的参数数组
   * @returns 
   */
   static query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connection();

      Model.connect.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });

      this.end();
    })
  }
	
	/**
	 * 返回操作是否成功的结果
	 * @param {String} text // 操作失败提示语
	 */
	static returnData(query, text = '获取数据失败') {
		if (query.then) {
			return query.catch(err => console.log(text + err.message));
		}
		return new Promise((resolve, reject) => resolve(query));
	}
}