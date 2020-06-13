var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    company_worked: [
      {
        type:Schema.Types.ObjectId,
        ref:"detail"
      }
    ],
    ticketManager:{
      type:Boolean,
      default:false
    },
    cur_company:{
      type:Schema.Types.ObjectId,
      ref:"detail"
    }
  },
  { timestamps: true }
);

userSchema.statics.findByEmailAndPassword = function(email, password) {
  var userObj = null;
  return new Promise(function(resolve, reject) {
    User.findOne({ email: email })
      .then(function(user) {
        if (!user) reject("Incorrect credentials");
        userObj = user;
        return bcrypt.compare(password, user.password);
      })
      .then(function(isMatched) {
        if (!isMatched) reject("Incorrect credentials");
        resolve(userObj);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

// To avoid rehashing the password again.
userSchema.pre("save", function(next) {
  var user = this;
  // whether password field is modified
  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, 8)
      .then(function(hashedPassword) {
        user.password = hashedPassword;
        next();
      })
      .catch(function(err) {
        next(err);
      });
  }
  else{
    next();
  }
});


var User = mongoose.model("user", userSchema);

module.exports = User;
