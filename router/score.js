const { 
	search, 
	add, 
	edit, 
	remove, 
	passed_rate, 
} = require("../controller/score");

module.exports = itemRouter => {
	itemRouter.post("/", search);
	itemRouter.post("/add", add);
	itemRouter.post("/edit", edit);
	itemRouter.post("/remove", remove);
	itemRouter.get("/passed_rate", passed_rate);
};