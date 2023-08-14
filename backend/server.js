const express = require("express");
const DBConnect = require("./config/db");
const routesUser = require("./routes/user");
const routesBlog = require("./routes/blog");
const { notFound, handleErrors } = require("./middlewares/error");
const path = require("path");
const app = express();
require("dotenv").config();
DBConnect();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use("/user", routesUser);
app.use("/blog", routesBlog);

app.use([notFound, handleErrors]);

app.listen(3500, console.log(`running on port ${port}`));
