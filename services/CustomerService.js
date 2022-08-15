import Errors from '../classes/Errors'
import customerModel from '../models/customer.model'

const customerService = {
  getAll: async (limit, offset, client_id) => {
    return await customerModel.getPaginatedItems(limit, offset, client_id)
  },
  hasCustomerByClient: async (id) => {
    var items = await customerModel.getByClientId(id)
    return items !== null ? true : false
  },
  getById: async (id) => {
    var customer = await customerModel.getByCustomerId(id)
    if (!customer) {
      throw new Errors.NO_RECORDS_FOUND()
    }
    return customer
  },

  getByName: async (id, name, clientId) => {
    var customer = await customerModel.getByCustomerId(id)
    if (!customer) {
      throw new Errors.NO_RECORDS_FOUND()
    }
    return customer
  },
  update: async (params) => {
    var isCustomerExist = await customerModel.getByCustomerName(params.customer_id, params.customer_name, params.client_id)
    if (isCustomerExist)
      throw new Errors.RECORD_ALREADY_EXISTS()
    else
      return await customerModel.update(params)
  },
  delete: async (params) => {
    return await customerModel.delete(params)
  },
  create: async (params) => {
    var isCustomerExist = await customerModel.getByCustomerName(0, params.customer_name, params.client_id)

    if (isCustomerExist)
      throw new Errors.RECORD_ALREADY_EXISTS()
    else
      return await customerModel.create(params)
  }
}

export {
  customerService
}
