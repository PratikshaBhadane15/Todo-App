var express = require("express");

var indexRouter = require("./routes/index");

var app = express();
const port = 3000;

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// error handler
app.use(function (err, req, res, next) {
  res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
