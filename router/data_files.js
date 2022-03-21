const { select, add, remove } = require("../controller/data_files");

module.exports = itemRouter => {
	itemRouter.get("/", select);
	itemRouter.post("/add", add);
	itemRouter.post("/remove", remove);
};