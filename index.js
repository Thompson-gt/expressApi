const express = require("express");
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
dontenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewURLParser: true }, () => {
	console.log("connected to the db");
});
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(5000, () => {
	console.log("server is listening");
});
