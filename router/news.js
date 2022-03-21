const { add, remove, count } = require("../controller/news");

module.exports = itemRouter => {
	itemRouter.post("/add", add);
	itemRouter.post("/remove", remove);
	itemRouter.get('/count', count)
};