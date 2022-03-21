/**
 * @param {Object} responseBody 响应体
 * 				--> res 响应对象
 * 				--> data 响应数据
 * 				--> message 响应提示
 * 				--> status 返回状态码 0 成功 -1 失败
 */
module.exports = function send(responseBody) {
	let { res, message, data, status, ...rest } = responseBody;
	res.send({ 
		status: status || 0, 
		data: data || {}, 
		message: message || '操作成功',
		...rest
	});
}