const express = require("express");
const {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blog");
const protect = require("../middlewares/blogValidation");
const router = express.Router();

router.route("/").get(getBlogs);
router.route("/create").post([protect, createBlog]);
router
  .route("/:id")
  .get(getBlogById)
  .put([protect, updateBlogById])
  .delete([protect, deleteBlogById]);

module.exports = router;
