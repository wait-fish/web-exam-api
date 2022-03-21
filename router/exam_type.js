const { search, add, remove, select, count } = require("../controller/exam_type.js");

module.exports = itemRouter => {
	itemRouter.get("/", search);
	itemRouter.post("/add", add);
	itemRouter.post("/remove", remove);	
	itemRouter.get("/select", select);
	itemRouter.get("/count", count);
};