const { search, add, edit, remove } = require("../controller/fund");

module.exports = itemRouter => {
	itemRouter.get("/", search);
	itemRouter.post("/add", add);
	itemRouter.post("/edit", edit);
	itemRouter.post("/remove", remove);
};