import express from "express"
const router = express.Router();
const blogs = require('../controllers/blog.controllers')
const {verifyToken, verifyAuthor} = require('../middlewares/authValidator')

//get all blogs
router.get("/", blogs.getAllBlog);

//get blog by id
router.get("/:id", blogs.getBlog);

//get blogs by title
router.get("/search/:title", blogs.getBlogByTitle)

//add blog
router.post("/:id", verifyToken, blogs.addBlog);

//update a blog
router.put("/:id", verifyAuthor, blogs.updateBlog);

//delete a blog
router.delete("/:id", verifyAuthor, blogs.deleteBlog);

module.exports = router;