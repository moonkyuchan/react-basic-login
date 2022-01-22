const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

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

app.post("/register", (req, res) => {
  //회원가입에 필요한 정보들을 클라이언트에서 받아
  //DB에 저장한다.
  const user = new User(req.body);

  // 몽고디비에서 가져온느 메소드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`App listening port on ${port}`);
});
