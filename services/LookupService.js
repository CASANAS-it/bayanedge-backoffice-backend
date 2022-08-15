import ExpenseTypeModel from '../models/ExpenseTypeModel';
import AssetTypeModel from '../models/AssetTypeModel'
import LiabilityTypeModel from '../models/LiabilityTypeModel'
import RevenueTypeModel from '../models/RevenueTypeModel';
import EquityTypeModel from '../models/EquityTypeModel';
import TransactionTypeModel from '../models/TransactionTypeModel';
import customerModel from '../models/customer.model';
import VendorModel from '../models/VendorModel'
import { AssetType } from '../classes/Constants';
import inventoryModel from '../models/inventory.model';
import NonOperatingExpenseTypeModel from '../models/OperatingExpenseTypeModel';


const lookupService = {
  getAllAssetType: async () => {
    return await AssetTypeModel.getAll()
  },
  getAllExpenseType: async () => {
    return await ExpenseTypeModel.getAll()
  },
  getAllEquityType: async () => {
    return await EquityTypeModel.getAll()
  },
  getAllLiabilityType: async () => {
    return await LiabilityTypeModel.getAll()
  },
  getAllRevenueType: async () => {
    return await RevenueTypeModel.getAll()
  },
  getAllTransactionType: async () => {
    return await TransactionTypeModel.getAll()
  },
  getAllCustomer: async (clientId) => {
    return await customerModel.getAllByClientId(clientId)
  },
  getAllVendor: async (clientId) => {
    return await VendorModel.getAllByClientId(clientId)
  },
  getAllItem : async (clientId) => {
    return await inventoryModel.getAllByClientId(clientId)
  },
  
  getAllOpexType : async (clientId) => {
    return await NonOperatingExpenseTypeModel.getAll(clientId)
  },

}



export {
  lookupService
}
