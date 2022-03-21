const { search, add, remove, edit, reset, login } = require("../controller/student_account");

module.exports = itemRouter => {
	itemRouter.get("/", search);
	itemRouter.post("/add", add);
	itemRouter.post("/remove", remove);
	itemRouter.post("/edit", edit);
	itemRouter.post("/reset", reset);
	itemRouter.post("/login", login);
};