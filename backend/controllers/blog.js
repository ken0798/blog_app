const { async } = require("rxjs");
const blogModal = require("../models/blog");
const asyncHandler = require("express-async-handler");

const getBlogs = asyncHandler(async function (req, res) {
  const blogs = await blogModal.find().sort({ updatedAt: -1 });
  res.json(blogs);
});

const createBlog = asyncHandler(async function (req, res) {
  const { title, info } = req.body;
  if (!title || !info) {
    res.status(401);
    throw new Error("Enter all Fields");
  } else {
    const blog = new blogModal({
      user: {
        id: req.user._id,
        pic: req.user.pic,
        author: `${req.user.fname} ${req.user.lname}`,
      },
      title,
      info,
    });
    await blog.save();
    res.status(201).json({
      message: "Created Successfully",
    });
  }
});

const getBlogById = asyncHandler(async function (req, res) {
  const { id } = req.params;
  const blog = await blogModal.findById(id);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not Found");
  }
});

const updateBlogById = asyncHandler(async function (req, res) {
  const { title, info } = req.body;
  const { id } = req.params;
  const blog = await blogModal.findById(id);
  //   console.log(blog.user.id.toString(), req.user._id.toString());
  if (blog.user.id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized Action");
  }
  if (blog) {
    blog.title = title;
    blog.info = info;
    await blog.save();
    res.status(201).json({
      message: "Updated Successfully",
    });
  } else {
    res.status(404);
    throw new Error("Blog not Found");
  }
});

const deleteBlogById = asyncHandler(async function (req, res) {
  const { id } = req.params;
  const blog = await blogModal.findById(id);
  if (blog.user.id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized Action");
  }
  if (blog) {
    await blog.deleteOne();
    res.json({
      message: "Successfully Removed!",
    });
  } else {
    res.status(404);
    throw new Error("Blog not Found");
  }
});
module.exports = {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
