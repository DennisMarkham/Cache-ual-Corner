var bcrypt = require("bcrypt-nodejs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
  	
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName:{
    	type: DataTypes.STRING, 
    	defaultValue:"guest123"
    },
    avatar_image: {
    	type: DataTypes.BLOB('tiny')
    },
    message_color : DataTypes.STRING,

    logged: {
      type: DataTypes.BOOLEAN, 
      defaultValue:false
    }

  }, {
    timestamps: false
  });

  Login.associate = function(models) {
    Login.hasMany(models.Chat, {
      onDelete: "cascade"
    });
  };

  //for encrypting password
  Login.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
 
  Login.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });


  return Login;
  // In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
};
// Exporting our configured passport
//module.exports = passport;



