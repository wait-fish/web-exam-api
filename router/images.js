const { select, add, remove } = require("../controller/images");

module.exports = itemRouter => {
	itemRouter.get("/", select);
	itemRouter.post("/add", add);
	itemRouter.post("/remove", remove);
};