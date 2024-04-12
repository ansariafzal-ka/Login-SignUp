require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

const connectDb = require("./config/mongodb");

connectDb();

const usersRouter = require("./routes/users.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", usersRouter);

app.get("/", (req, res) => {
  res.send("BISMILLAH");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
