const express = require('express');
const router = express.Router();
const upload = require("../controller/upload");
const getCols = require("../controller/table.js");

// 子项路由器
const userRouter = express.Router();
router.use("/user", userRouter);
require("./user")(userRouter);

const menuRouter = express.Router();
router.use("/menu", menuRouter);
require("./menu")(menuRouter);

const examTypeRouter = express.Router();
router.use("/exam_type", examTypeRouter);
require("./exam_type")(examTypeRouter);

const studentRouter = express.Router();
router.use("/student", studentRouter);
require("./student")(studentRouter);

const scoreRouter = express.Router();
router.use("/score", scoreRouter);
require("./score")(scoreRouter);

const fundRouter = express.Router();
router.use("/fund", fundRouter);
require("./fund")(fundRouter);

const dataFilesRouter = express.Router();
router.use("/data_files", dataFilesRouter);
require("./data_files")(dataFilesRouter);

const expandRouter = express.Router();
router.use("/expand", expandRouter);
require("./expand")(expandRouter);

const imagesRouter = express.Router();
router.use("/images", imagesRouter);
require("./images")(imagesRouter);

const studentAccountRouter = express.Router();
router.use("/student_account", studentAccountRouter);
require("./student_account")(studentAccountRouter);

const newsRouter = express.Router();
router.use("/news", newsRouter);
require("./news")(newsRouter);

router.use("/upload", upload);

router.use("/table", getCols);

module.exports = router;