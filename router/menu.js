const { search, add, remove, select } = require("../controller/menu");

module.exports = itemRouter => {
	itemRouter.get("/", search);
	itemRouter.post("/add", add);
	itemRouter.post("/remove", remove);
	itemRouter.get("/select", select);
};