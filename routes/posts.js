const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//create post

router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		res.status(500).json(error);
	}
});
//update post
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await post.updateOne({ $set: req.body });
			res.status(200).json("the post has been updated");
		} else {
			return res.status(403).json("cant update this post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//delete post
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await post.deleteOne();
			res.status(204).json("the post has been deleted");
		} else {
			return res.status(403).json("cant delete this post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//like/dislike post
router.put("/:id/like", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//likes post is userId does not already belong to the posts liked array
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json("post liked");
		} else {
			//unlikes the post by pulling the userId out of the posts liked array
			await post.updateOne({ $pull: { likes: req.body.userId } });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});
//get a post
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
});
//get users followed post
router.get("/timeline/all", async (req, res) => {
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPosts = await Post.find({ userId: currentUser._id });
		const friendPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);
		if (friendPosts.length === 0) {
			res.status(404).json("no post to show");
		}
		res.json(userPosts.concat(...friendPosts));
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
