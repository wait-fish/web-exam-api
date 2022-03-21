/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : db_student_examination_system

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 21/03/2022 15:12:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for data_files
-- ----------------------------
DROP TABLE IF EXISTS `data_files`;
CREATE TABLE `data_files`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data_url` varchar(2014) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文档地址',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上传的时间',
  `year` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '年度',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of data_files
-- ----------------------------
INSERT INTO `data_files` VALUES (1, '测试的文件地址', 'upload/002.xls', '2022-03-14 11:15:25', '2022');
INSERT INTO `data_files` VALUES (8, '上传的资料', 'upload\\LchhjpAtJxihD6CDl2O7jWYO.xlsx', '2022-03-14 15:13:51', '2022');
INSERT INTO `data_files` VALUES (11, '测试用超长的名字啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', 'upload\\Y4joq-tJd-AVU3l0Kjl_ff6t.docx', '2022-03-18 16:10:56', '2022');
INSERT INTO `data_files` VALUES (7, '添加测试的文件', 'upload/002.xls', '2022-03-14 13:32:09', '2020');
INSERT INTO `data_files` VALUES (13, '添加测试的文件', 'upload/002.xls', '2022-03-20 15:10:50', '2020');

-- ----------------------------
-- Table structure for exam_type
-- ----------------------------
DROP TABLE IF EXISTS `exam_type`;
CREATE TABLE `exam_type`  (
  `exam_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '考试类型',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exam_level` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '考试等级',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_type
-- ----------------------------
INSERT INTO `exam_type` VALUES ('web前端开发', 1, '初级');
INSERT INTO `exam_type` VALUES ('web前端开发', 2, '中级');
INSERT INTO `exam_type` VALUES ('微信小程序开发', 31, '初级');
INSERT INTO `exam_type` VALUES ('微信小程序开发', 32, '中级');
INSERT INTO `exam_type` VALUES ('微信小程序开发', 33, '高级');

-- ----------------------------
-- Table structure for expand
-- ----------------------------
DROP TABLE IF EXISTS `expand`;
CREATE TABLE `expand`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of expand
-- ----------------------------
INSERT INTO `expand` VALUES (1, 'upload\\Z_lYQkE6U7rqade-4CXDkhky.jpeg', 'https://element.eleme.cn/#/zh-CN/component/message-box', '测试导航2');

-- ----------------------------
-- Table structure for fund
-- ----------------------------
DROP TABLE IF EXISTS `fund`;
CREATE TABLE `fund`  (
  `students` int(11) NOT NULL DEFAULT 0 COMMENT '学生报名人数',
  `student_price` decimal(10, 2) NOT NULL DEFAULT 300.00 COMMENT '学生报名费',
  `registery_fee_total` decimal(11, 2) UNSIGNED NOT NULL COMMENT '汇款的金额',
  `stub_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '学校汇款给工信部的存根',
  `teachers` int(11) NOT NULL DEFAULT 0 COMMENT '考务费份数',
  `teacher_price` decimal(10, 2) NOT NULL DEFAULT 120.00 COMMENT '考务费',
  `exam_fee_total` decimal(11, 2) NOT NULL COMMENT '考务费总数',
  `invoice_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '工信部发回的发票',
  `order_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单编号：开始时间+结束时间+随机数',
  `active` int(11) NOT NULL COMMENT '0：学校报名未汇款\r\n1：学校汇款，工信部未汇款\r\n2：学校汇款，工信部汇款\r\n',
  `edit_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '编辑时自动更新',
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fund
-- ----------------------------
INSERT INTO `fund` VALUES (1, 300.00, 300.00, 'upload\\rIP8OLPz30423VVrSi9883Hn.jpeg', 1, 120.00, 120.00, 'upload\\9QwMJaG3X8OOk0mIQLwzHvSI.jpeg', '2022-01-15|2022-01-16', 2, '2022-01-16 00:44:13');
INSERT INTO `fund` VALUES (1, 300.00, 300.00, NULL, 1, 120.00, 120.00, NULL, '2022-01-15|2022-01-14', 1, '2022-01-15 17:56:53');
INSERT INTO `fund` VALUES (2, 300.00, 600.00, NULL, 0, 120.00, 0.00, NULL, '2022-01-14|2022-01-15', 1, '2022-01-15 17:57:04');
INSERT INTO `fund` VALUES (10, 300.00, 3000.00, 'upload\\dR_8WnnjGeETxX2BRqKVMTBk.jpeg', 0, 120.00, 0.00, 'upload\\EuH68B85jdjAbHYCXqrTj20c.jpeg', '2022-01-04|2022-01-15|1642253166384', 2, '2022-01-16 00:42:26');
INSERT INTO `fund` VALUES (12, 300.00, 3600.00, 'upload\\olQPZS4X2gor1QgnU_1-ohYo.jpeg', 2, 120.00, 240.00, 'upload\\ib1RYy98Wgl28JDGTYxEPKmt.jpeg', '2021-12-29|2022-01-06|1642411159180', 2, '2022-01-17 17:19:56');
INSERT INTO `fund` VALUES (4, 300.00, 1200.00, NULL, 0, 120.00, 0.00, NULL, '2022-01-12|2022-01-13|1642411216159', 0, '2022-01-17 17:20:16');

-- ----------------------------
-- Table structure for images
-- ----------------------------
DROP TABLE IF EXISTS `images`;
CREATE TABLE `images`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上传的时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '备注/图片名字',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of images
-- ----------------------------
INSERT INTO `images` VALUES (1, 'upload/0qjE7fggXAxYqyDuEsmw3ACJ.jpeg', '2022-03-14 19:01:54', '001');
INSERT INTO `images` VALUES (10, 'upload\\8w714LAEeaFHckHp8PgFUM6g.jpg', '2022-03-21 15:08:08', 'test03');
INSERT INTO `images` VALUES (8, 'upload\\L7OR60Hd--jeRYiH-OB1UzsJ.jpg', '2022-03-19 22:25:31', 'test');
INSERT INTO `images` VALUES (5, 'upload/7nRC8-AvdJ6iEwLC4OZwn-ba.jpeg', '2022-03-14 19:03:47', '75');
INSERT INTO `images` VALUES (6, 'upload\\5kaCxSpKJFquLVse0H7Xbd4m.jpg', '2022-03-14 19:56:24', 'test1');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `year` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '年级',
  `class` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '班级',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `specialty` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '专业',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('2019', 'B', 2, '计算机应用技术');
INSERT INTO `menu` VALUES ('2020', 'C', 3, '计算机网络技术');
INSERT INTO `menu` VALUES ('2020', 'B', 4, '计算机应用技术');
INSERT INTO `menu` VALUES ('2021', 'C', 5, '计算机应用技术');
INSERT INTO `menu` VALUES ('2020', 'D', 6, '计算机应用技术');
INSERT INTO `menu` VALUES ('2019', 'C', 7, '计算机应用技术');
INSERT INTO `menu` VALUES ('2022', 'A', 8, '计算机软件技术');
INSERT INTO `menu` VALUES ('2020', 'A', 35, '计算机应用技术');
INSERT INTO `menu` VALUES ('2021', 'B', 34, '计算机应用技术');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '对应前台的账号',
  `status` int(2) NOT NULL COMMENT '0,1成功，失败 --->拓展可能需要',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (5, '1906030243', 0);

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `student_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学号',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `specialty` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '专业',
  `year` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '年级',
  `class` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '班级',
  `exam_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '考试类型',
  `exam_level` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '考试等级',
  `theory` int(5) NOT NULL COMMENT '理论成绩',
  `practice` int(5) NOT NULL COMMENT '实操成绩',
  `s_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一索引',
  `registration_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`s_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('1902131543', 'test1', '计算机应用技术', '2019', 'A', 'web前端开发', '初级', 65, 87, 29, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131544', 'test2', '计算机应用技术', '2018', 'A', 'web前端开发', '初级', 45, 65, 30, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131545', 'test3', '计算机应用技术', '2020', 'A', 'web前端开发', '中级', 75, 65, 31, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131547', 'test5', '计算机应用技术', '2022', 'B', '微信小程序开发', '中级', 62, 23, 32, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131546', 'test4', '计算机应用技术', '2021', 'C', 'web前端开发', '中级', 64, 89, 33, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131548', 'test6', '计算机软件技术', '2023', 'B', '微信小程序开发', '中级', 88, 99, 34, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131549', 'test7', '计算机软件技术', '2024', 'B', '微信小程序开发', '中级', 3, 23, 35, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131551', 'test9', '计算机软件技术', '2022', 'C', '微信小程序开发', '高级', 78, 58, 36, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131550', 'test8', '计算机软件技术', '2020', 'C', '微信小程序开发', '中级', 23, 42, 37, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131552', 'test10', '计算机网络技术', '2020', 'C', '微信小程序开发', '高级', 79, 59, 38, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131553', 'test11', '物联网技术', '2020', 'C', 'web前端开发', '高级', 80, 60, 39, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131555', 'test13', '物联网技术', '2020', 'D', 'web前端开发', '高级', 82, 62, 40, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131554', 'test12', '物联网技术', '2020', 'D', 'web前端开发', '高级', 81, 61, 41, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1902131556', 'test14', '物联网技术', '2020', 'D', 'web前端开发', '高级', 99, 63, 42, '2022-01-12 22:08:04');
INSERT INTO `score` VALUES ('1234567891', 'test', '计算机网络技术', '2020', 'C', 'web前端开发', '中级', 12, 12, 48, '2022-03-19 22:22:45');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `student_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学号',
  `img_src` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '证件照地址',
  `id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '身份证',
  `specialty` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '专业',
  `year` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '年级',
  `class` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '班级',
  `exam_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '考试类型',
  `exam_level` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '考试等级',
  `status` int(2) NOT NULL DEFAULT 2 COMMENT '（0,1,2）通过，失败，待审核',
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `registration_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`s_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 95 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('张三看五', '1906030243', 'upload/18UtX_b9LYOKZKeTHE4Mn5mZ.jpeg', '4451222200005154712', '计算机应用技术', '2019', 'B', 'web前端开发', '初级', 0, 1, '2022-01-12 18:06:29');
INSERT INTO `student` VALUES ('李四沙', '1906030242', 'upload/j8YGkmgedNwEXeVDXG9oPko1.jpeg', '4451222313131313231', '计算机应用技术', '2019', 'B', 'web前端开发', '中级', 0, 2, '2022-01-12 17:32:24');
INSERT INTO `student` VALUES ('等鱼', '123', 'upload\\a9XBnW5i_87DyE2F03_itOvD.jpeg', '2', '计算机应用技术', '2021', 'C', 'web前端开发', '初级', 0, 64, '2021-12-17 22:06:33');
INSERT INTO `student` VALUES ('鱼', '124', ' ', '3', '计算机应用技术', '2020', 'b', 'web前端开发', '初级', 0, 65, '2022-01-12 22:06:36');
INSERT INTO `student` VALUES ('等鱼', '125', ' ', '4', '计算机应用技术', '2021', 'b', 'web前端开发', '初级', 0, 66, '2022-01-12 22:06:40');
INSERT INTO `student` VALUES ('qq', '126', ' ', '5', '计算机应用技术', '2022', 'b', 'web前端开发', '初级', 0, 67, '2022-01-13 22:06:45');
INSERT INTO `student` VALUES ('等鱼', '127', ' ', '6', '计算机网络技术', '2020', 'C', 'web前端开发', '中级', 0, 68, '2022-01-08 22:06:48');
INSERT INTO `student` VALUES ('等鱼', '128', ' ', '7', '计算机应用技术', '2024', 'b', 'web前端开发', '初级', 0, 69, '2022-01-14 22:06:51');
INSERT INTO `student` VALUES ('等鱼', '19060302444', 'upload\\4icirJTgdkFcdgdsIoxge6iL.png', '445122212151212415212', '计算机应用技术', '2021', 'B', 'web前端开发', '中级', 2, 88, '2022-03-18 19:28:44');
INSERT INTO `student` VALUES ('111', '1111111111', '', '4451222000051547199', '计算机软件技术', '2022', 'A', '微信小程序开发', '高级', 0, 87, '2022-03-18 09:29:08');
INSERT INTO `student` VALUES ('等鱼', '131', ' ', '10', '计算机应用技术', '2021', 'C', 'web前端开发', '中级', 0, 72, '2022-01-14 22:07:00');
INSERT INTO `student` VALUES ('等鱼', '132', ' ', '11', '计算机应用技术', '2021', 'C', '微信小程序开发', '高级', 0, 73, '2022-01-06 22:07:03');
INSERT INTO `student` VALUES ('等鱼', '1906030242', 'upload\\bizA0xedMzzdUG1-hS4PiFOn.ico', '445122212151212415212', '计算机应用技术', '2021', 'B', 'web前端开发', '中级', 2, 89, '2022-03-18 21:50:46');

-- ----------------------------
-- Table structure for student_account
-- ----------------------------
DROP TABLE IF EXISTS `student_account`;
CREATE TABLE `student_account`  (
  `student_no` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学号/账号/唯一性',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学生姓名',
  `id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份证/选填',
  `specialty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '专业/选填',
  `year` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '年级/选填',
  `class` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '班级/选填',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '123456' COMMENT '学生账号密码/默认：123456',
  PRIMARY KEY (`student_no`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_account
-- ----------------------------
INSERT INTO `student_account` VALUES ('1906030242', '等鱼', '445122212151212415212', '计算机应用技术', '2021', 'B', '123456');
INSERT INTO `student_account` VALUES ('1902131556', 'test14', ' ', '物联网技术', '2020', 'D', '123456');
INSERT INTO `student_account` VALUES ('1902131555', 'test13', ' ', '物联网技术', '2020', 'D', '123456');
INSERT INTO `student_account` VALUES ('1902131554', 'test12', ' ', '物联网技术', '2020', 'D', '123456');
INSERT INTO `student_account` VALUES ('1902131553', 'test11', ' ', '物联网技术', '2020', 'C', '123456');
INSERT INTO `student_account` VALUES ('1902131552', 'test10', ' ', '计算机网络技术', '2020', 'C', '123456');
INSERT INTO `student_account` VALUES ('1902131551', 'test9', ' ', '计算机软件技术', '2022', 'C', '123456');
INSERT INTO `student_account` VALUES ('1902131550', 'test8', ' ', '计算机软件技术', '2020', 'C', '123456');
INSERT INTO `student_account` VALUES ('1902131549', 'test7', ' ', '计算机软件技术', '2024', 'B', '123456');
INSERT INTO `student_account` VALUES ('1902131548', 'test6', ' ', '计算机软件技术', '2023', 'B', '123456');
INSERT INTO `student_account` VALUES ('1902131547', 'test5', ' ', '技术应用技术', '2022', 'B', '123456');
INSERT INTO `student_account` VALUES ('1902131546', 'test4', ' ', '技术应用技术', '2021', 'A', '123456');
INSERT INTO `student_account` VALUES ('1902131545', 'test3', ' ', '技术应用技术', '2020', 'A', '123456');
INSERT INTO `student_account` VALUES ('1902131544', 'test2', ' ', '技术应用技术', '2018', 'A', '123456');
INSERT INTO `student_account` VALUES ('1902131543', 'test1', ' ', '技术应用技术', '2019', 'A', '123456');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `useraccount` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `grade` int(2) NOT NULL DEFAULT 1 COMMENT '(0,1,2)超级管理员，普通管理员，游客',
  `remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '无，老师，或者xxx',
  PRIMARY KEY (`useraccount`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('test01', 'ee3a77d54116b0c1ba54bbb77ed61caf', 1, '测试号01');
INSERT INTO `user` VALUES ('12345456', 'ee3a77d54116b0c1ba54bbb77ed61caf', 2, '校领导过来检查');
INSERT INTO `user` VALUES ('test03', 'ee3a77d54116b0c1ba54bbb77ed61caf', 0, '不是真超级管理员测试');
INSERT INTO `user` VALUES ('test02', 'ee3a77d54116b0c1ba54bbb77ed61caf', 2, '测试号02');
INSERT INTO `user` VALUES ('admin1234455', 'ee3a77d54116b0c1ba54bbb77ed61caf', 1, '专业的普通老师');
INSERT INTO `user` VALUES ('admin', '103a1ae0570d7b3366b6b41a20011a37', 0, 'System');

SET FOREIGN_KEY_CHECKS = 1;
