// Import Mongoose
import mongoose from 'mongoose'
// Logging
import Logger from './Logger'
// Properties
import properties from '../properties.js'
import apilogModel from '../models/apilog.model'
import userModel from '../models/user.model'
import enterpriseModel from '../models/enterprise.model'
import accountModel from '../models/account.model'

// Start Import Models

// End Import Models

/**
 * Connection to DB
 */
class Database {
  /**
   * Init database
   */
  async init() {
    await this.authenticate()
    Logger.info('MongoDB connected at: ' + properties.db_dbUrl)

    await this.initCollections()
  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info('Authenticating to the databases...')
    try {
      this.dbConnection_eVoucher_db = await mongoose.connect(
        'mongodb://' + properties.db_dbUrl,
        { useNewUrlParser: true }
      )
    } catch (err) {
      Logger.error(`Failed connection to the DB: ${err.message}`)
      Logger.error(err)
      await new Promise((resolve) => setTimeout(resolve, 5000))
      await this.authenticate()
    }
  }

  /**
   * Get connection db
   *  @return {String} Connection to db
   */
  getConnection() {
    return this.dbConnection_eVoucher_db
  }

  async initCollections() {
    await apilogModel.init()
    await userModel.init()
    await enterpriseModel.init()
    await accountModel.init()
  }
  
}

export default new Database()
