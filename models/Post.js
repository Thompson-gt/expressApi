const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			maxlength: 500,
		},
		img: {
			type: String,
		},
		likes: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
