"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const blogs = require('../controllers/blog.controllers');
const { verifyToken } = require('../middlewares/authValidator');
//get all blogs
router.get("/", blogs.getAllBlog);
//get blog by id
router.get("/:id", blogs.getBlog);
//get blogs by title
router.get("/search/:title", blogs.getBlogByTitle);
//add blog
router.post("/", verifyToken, blogs.addBlog);
//update a blog
router.put("/:id", blogs.updateBlog);
//delete a blog
router.delete("/:id", blogs.deleteBlog);
module.exports = router;
