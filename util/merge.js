// 合并数据
// 要合并的数据，合并到哪个键
module.exports = function merge(data, keyName) {
	let tmpArr = [];
	data.forEach(item => {
		// 如果存在该对象
		let index = tmpArr.findIndex(a => a[keyName] === item[keyName]);
		if ( index === -1) {
			let obj = {};
			obj[keyName] = item[keyName];
			// obj.label = item[keyName];
			obj.children = [item];
			tmpArr.push(obj);
		} else tmpArr[index].children.unshift(item); // 头插入保证最新的在前面
		delete item[keyName]
	});
	return tmpArr;
}