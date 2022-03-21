module.exports = function isEmpty(val) {
	if (val === "" || val === undefined || val === null || val.length === 0) return true;
	if (typeof val === 'object' && Object.keys(val).length === 0) return true; 
	 return false;
}