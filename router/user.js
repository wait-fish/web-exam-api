const { get, login, register, remove, edit, search } = require("../controller/user");

module.exports = itemRouter => {
	itemRouter.get("/", get);
	itemRouter.post("/register", register);
	itemRouter.post("/login", login);
	itemRouter.post("/remove", remove);
	itemRouter.post("/edit", edit);
};

