const express = require("express");
const mongoose = require("mongoose");
const appRouter = require("./routes/Authroutes");
const cookieParser = require("cookie-parser");
const {
  authMiddleware,
  checkUser,
  checkMiddleWare,
} = require("./middleware/authMiddleware");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://localhost:27017/node_jwt";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
    console.log("database conected");
    console.log("listening on port 3000");
  })
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", checkMiddleWare, (req, res) => {
  console.log(res.data);
  res.render("home");
});
app.get("/smoothies", authMiddleware, (req, res) => {
  const user = {
    name: "james",
  };
  res.render("smoothies", { user });
});
app.use(appRouter);
