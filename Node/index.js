const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://kyuchan:12341234@nodelogin.oqkzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      // mongoose 6 부터는 적어줄 필요가 없다?
    }
  )
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => res.send("4000번에 서버 실행중!!"));

app.listen(port, () => {
  console.log(`App listening port on ${port}`);
});
