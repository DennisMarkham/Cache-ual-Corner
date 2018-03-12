
module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {

    chat_messages: DataTypes.TEXT,
    chat_time:{ type:DataTypes.DATE, defaultValue:DataTypes.NOW}
  }, {
    timestamps: false
  });


  Chat.associate = function(models) {
    Chat.belongsTo(models.Login, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Chat;
};

