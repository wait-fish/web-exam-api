const Table = require('../model/table.js');
const { send } = require('../util');

module.exports = async (req, res) => {
	let data = await Table.getCols(req.query.name);
	data = data.map(item => item.COLUMN_NAME);
	send({ res, data });
}
