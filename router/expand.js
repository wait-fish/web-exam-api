const { select, add, edit, remove } = require("../controller/expand");

module.exports = itemRouter => {
	itemRouter.get("/", select);
	itemRouter.post("/add", add);
	itemRouter.post("/edit", edit);
	itemRouter.post("/remove", remove);
};