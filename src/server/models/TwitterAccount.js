const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const TwitterAccount = sequelize.define('TwitterAccount', {
    screenName: DataTypes.STRING(128),
    preferredDisplayName: DataTypes.STRING(512),
    listName: DataTypes.STRING(128),
    isActive: DataTypes.BOOLEAN,
  }, {})

  TwitterAccount.getByScreenNames = async screenNames => (TwitterAccount.findAll({
    where: {
      screenName: {
        [Sequelize.Op.in]: screenNames,
      },
    },
    order: [['createdAt', 'DESC']],
  }))

  TwitterAccount.getByScreenName = async screenName => TwitterAccount.getByScreenNames([screenName])

  TwitterAccount.getActive = async () => TwitterAccount.findAll({
    where: {
      isActive: true,
    },
  })

  TwitterAccount.getActiveByListNames = async listNames => (
    TwitterAccount.findAll({
      where: {
        listName: {
          [Sequelize.Op.in]: listNames,
        },
        isActive: true,
      },
    })
  )

  TwitterAccount.getActiveByListName = async listName => TwitterAccount
    .getActiveByListNames([listName])

  return TwitterAccount
}
