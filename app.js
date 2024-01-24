const express = require("express");
const mongoose = require("mongoose");
const appRouter = require("./routes/Authroutes");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json())
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
app.get("/", (req, res) => res.render("home"));
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("homes");
});
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(appRouter);
