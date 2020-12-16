const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const recipesRoutes = require("./routes/recipes-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/recipes", recipesRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect(
    "mongodb+srv://admin:admin>@cluster0.po6sj.mongodb.net/your-recipes?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .catch();
