import Errors from '../classes/Errors'
import inventoryModel from '../models/inventory.model'

const inventoryService = {
  getAll: async (limit, offset, client_id) => {
    return await inventoryModel.getPaginatedItems(limit, offset, client_id)
  },
  getSummary: async (client_id) => {
    var items = await inventoryModel.getAllByClientId(client_id)
    var total = 0;
    items.forEach(element => {
      total += element.unit_cost * element.quantity
    });
    return total
  },
  hasInventoryByClient: async (id) => {
    var items = await inventoryModel.getByClientId(id)
    return items !== null ? true : false
  },
  getById: async (id) => {
    var inventory = await inventoryModel.getByItemId(id)
    if (!inventory) {
      throw new Errors.NO_RECORDS_FOUND()
    }
    return inventory
  },
  update: async (params) => {
    return await inventoryModel.update(params)
  },
  delete: async (params) => {
    return await inventoryModel.delete(params)
  },
  create: async (params) => {
    return await inventoryModel.create(params)
  }
}

export {
  inventoryService
}
