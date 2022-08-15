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
import customerModel from '../models/customer.model'
import cashjournalModel from '../models/cashjournal.model'
import inventoryModel from '../models/inventory.model'
import AccountPayableModel from '../models/AccountPayableModel'
import AccountReceivableModel from '../models/AccountReceivableModel'
import BeginningBalanceModel from '../models/BeginningBalanceModel'
import LedgerModel from '../models/LedgerModel'
import SalesModel from '../models/SalesModel'
import VendorModel from '../models/VendorModel'
import UserTypeModel from '../models/UserTypeModel'
import TransactionTypeModel from '../models/TransactionTypeModel'
import ExpenseTypeModel from '../models/ExpenseTypeModel'
import AssetTypeModel from '../models/AssetTypeModel'
import LiabilityTypeModel from '../models/LiabilityTypeModel'
import RevenueTypeModel from '../models/RevenueTypeModel'
import EquityTypeModel from '../models/EquityTypeModel'
import OperatingExpenseTypeModel from '../models/OperatingExpenseTypeModel'
import LoansPayableModel from '../models/LoansPayableModel'
import LoansRepaymentModel from '../models/LoansRepaymentModel'
import LoansPayableItemModel from '../models/LoansPayableItemModel'
import LoansProceedModel from '../models/LoansProceedModel'
import ClientUserModel from '../models/ClientUserModel'
import ClientModel from '../models/ClientModel'
import SubscriptionHistory from '../models/SubscriptionHistory'
import UserModel from '../models/UserModel'

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
        properties.butler_db_string,
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
    apilogModel.init()
    userModel.init()
    enterpriseModel.init()
    accountModel.init()
    cashjournalModel.init()
    inventoryModel.init()
    AccountPayableModel.init()
    AccountReceivableModel.init()
    BeginningBalanceModel.init()
    LedgerModel.init()
    SalesModel.init()
    VendorModel.init()
    UserTypeModel.init()
    TransactionTypeModel.init()
    customerModel.init()

    ExpenseTypeModel.init()
    AssetTypeModel.init()
    LiabilityTypeModel.init()
    RevenueTypeModel.init()
    EquityTypeModel.init()
    OperatingExpenseTypeModel.init()

    LoansPayableModel.init()
    LoansRepaymentModel.init()
    LoansPayableItemModel.init()
    LoansProceedModel.init()
    ClientUserModel.init()
    ClientModel.init()
    SubscriptionHistory.init()
    UserModel.init()
  }
}

export default new Database()
