const { posts, comments } = require("../../models/posts/posts.model");

const postCreate = async (req, res) => {
  const { postname, comment } = req.body;
  const c = await comments.create({ comment: comment });
  const isPExisted = await posts.findOne({ postname: postname });
  if (isPExisted) {
    isPExisted.comments.push(c._id);
    isPExisted.save();
    c.post = isPExisted._id;
    c.save();
    res.json({
      message: "comment added",
      posts: isPExisted,
      comment: c,
    });
  } else {
    const p = await posts.create({ postname: postname });
    c.post = p._id;
    c.save();
    p.comments.push(c._id);
    p.save();
    res.json({
      message: "post created successfully",
      posts: p,
      comment: c,
    });
  }
};

const getAll = async (req, res) => {
  const postData = await posts.find({}).populate("comments");

  if (postData.length > 0) {
    res.json({
      status: 200,
      message: "data retirved successfully",
      data: postData,
    });
  } else {
    res.json({
      status: 500,
      message: "data not retirved successfully",
      data: [],
    });
  }
};

module.exports = { postCreate ,getAll};
