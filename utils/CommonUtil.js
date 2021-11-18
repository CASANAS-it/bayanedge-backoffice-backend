import jsonwebtoken from 'jsonwebtoken'
import Logger from '../classes/Logger'
import CustomerTypeModel from '../models/CustomerTypeModel'
import MerchantTypeModel from '../models/MerchantTypeModel'
import TransactionTypeModel from '../models/TransactionTypeModel'
import UserTypeModel from '../models/UserTypeModel'
import properties from '../properties'

const regex = /^[A-Za-z0-9 ]+$/

function getUserFromToken (header) {
  const token = header.authorization.replace('Bearer ', '')
  Logger.info(token)
  const decodedUser = jsonwebtoken.verify(token, properties.tokenSecret)
  Logger.info(JSON.stringify(decodedUser))
  return decodedUser
}

async function getTransactionType (code) {
  return await TransactionTypeModel.findByCode(code)
}
async function getUserType (code) {
  return await UserTypeModel.findByCode(code)
}
async function getCustomerType (code) {
  return await CustomerTypeModel.findByCode(code)
}
async function getMerchantType (code) {
  return await MerchantTypeModel.findByCode(code)
}

function validateStringValue (val) {
  if (undefined === val || val === '') {
    return true
  }
  return false
}

function validateSpecialStringValue (val) {
  if (validateStringValue(val)) {
    return true
  }
  if (!regex.test(val)) {
    return true
  }
  return false
}

export {
  getUserFromToken,
  getTransactionType,
  getUserType,
  getCustomerType,
  getMerchantType,
  validateStringValue,
  validateSpecialStringValue
}
