const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
	const { username, password, email } = req.body;

	try {
		//generating new password
		const salt = await bcrypt.genSalt(10);
		hashedPassword = await bcrypt.hash(password, salt);

		//creating new user
		const newUser = new User({
			username: username,
			email: email,
			password: hashedPassword,
		});

		//saving new user in db and sending response
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		//check email
		const user = await User.findOne({ email: email });
		!user && res.status(404).json({ message: "no user found" });
		//check password
		const validPassword = await bcrypt.compare(password, user.password);
		!validPassword && res.status(400).json({ message: "wrong password " });

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
