const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dot = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const home = require("./routes/Home");
const users = require("./routes/Users");
const auth = require("./routes/auth");
const product = require("./routes/Products");
const category = require("./routes/Categories");
const googleuser = require("./routes/GoogleUsers");

dot.config({ path: "./config/dev.env" });

app.use(express.json());
app.use(bodyParser.json());
app.use("/image", express.static(path.join(__dirname, "public/uploads")));
app.use(cors());
app.use("/", home);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/products", product);
app.use("/api/categories", category);
app.use("/api/google", googleuser);

//template engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongoose-connection
mongoose
  .connect(process.env.db)
  .then(() => console.log(`connected to the mongodb...`))
  .catch((err) =>
    console.log(`error connecting to the mongodb..${err.message}`)
  );

//listening
const port = process.env.PORT || 1111;
app.listen(port, () => console.log(`listening on Port=${port}`));
