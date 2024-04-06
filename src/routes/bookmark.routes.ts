import express from "express"
const router = express.Router();
const bookmark = require('../controllers/bookmark.controllers')
const {verifyToken} = require('../middlewares/authValidator')

//get blogs by title
// router.get("/search/:title", blogs.getBlogByTitle)
router.get("/:id", verifyToken, bookmark.getUserBookmark);
//add blog
router.post("/:id", verifyToken, bookmark.addBookmark);
router.delete("/:id", verifyToken, bookmark.deleteUserBookmark);

module.exports = router;