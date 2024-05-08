const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			minValue: 3,
			maxValue: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			maxValue: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			mixValue: 6,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		coverPicture: {
			type: String,
			default: "",
		},
		followers: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			maxlength: 50,
		},
		city: {
			type: String,
			maxlength: 50,
		},
		from: {
			type: String,
			maxlength: 50,
		},
		relationship: {
			type: Number,
			enum: [1, 2, 3],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
