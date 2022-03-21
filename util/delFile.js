const fs = require('fs');

module.exports = function delFile(path) {
	return fs.unlink(`${__dirname}/../assets/` + path, err => {
		if (err == null) return true;
		return false; 
	});
}