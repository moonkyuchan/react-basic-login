const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
const { JsonWebTokenError } = require("jsonwebtoken");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // mongoose 6 부터는 적어줄 필요가 없다?
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) =>
  res.send("4000번에 서버 실행중!! 노드몬 테스트!!!.. 잘 작동하네요")
);

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

app.post("/login", (req, res) => {
  //1. 데이터 베이스에 요청된 이메일이 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({ loginSuccess: false, message: "User Not Found" });
    }

    //2. 이메일이 있다면 && 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      //3. 비밀번호가 맞다면 && 토큰생성
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        // token을 그럼 어디에 저장할까? cookie-parser 라이브러리로 쿠키에 저장해보자
        else {
          return res
            .cookie("UserAuth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        }
      });
    });
  });
});

app.listen(port, () => {
  console.log(`App listening port on ${port}`);
});
