const { search, add, edit, count, remove, exam_number, date_count } = require("../controller/student");

module.exports = itemRouter => {
	itemRouter.post("/", search);
	itemRouter.post("/add", add);
	itemRouter.post("/edit", edit);
	itemRouter.post("/remove", remove);
	itemRouter.get("/count", count);
	itemRouter.get("/exam_number", exam_number);
	itemRouter.get("/date_count", date_count);
};