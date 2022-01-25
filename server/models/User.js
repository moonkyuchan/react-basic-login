const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
    //예를들어 1이면 관리자 0이면 일반
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
    // 토큰의 유효기간
  },
});

// 스키마 save 전에 Pre 단계에서 비밀번호를 암호화 해준다.
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassowrd, callback) {
  // 입력한 비밀번호와 암호화된 비밀번호가 있는데 입력한 비밀번호를 암호화 해서 비교해야한다.
  bcrypt.compare(plainPassowrd, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

userSchema.methods.generateToken = function (callback) {
  // jsonwebToke 사용해서 토큰 생성
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secreatToken");
  user.token = token;
  user.save(function (err, callack) {
    if (err) {
      return callback(err);
    } else {
      callback(null, user);
    }
  });
};

userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  // token을 디코드 한다
  jwt.verify(token, "secreatToken", function (err, decoded) {
    // 유저 아이디를 이용해 유저를 찾고
    // 클라이언트 token과 데이터베이스 token 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) {
        return callback(err);
      } else {
        callback(null, user);
      }
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
