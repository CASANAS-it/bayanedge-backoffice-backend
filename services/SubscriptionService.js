import Errors from '../classes/Errors'
import ClientModel from '../models/ClientModel';
import SubscriptionHistory from '../models/SubscriptionHistory'

const subscriptionService = {
  getAll: async (limit, offset) => {
    return await SubscriptionHistory.getPaginatedItems(limit, offset)
  },
  getAllByClient: async (limit, offset, client_id) => {
    return await SubscriptionHistory.getPaginatedItemsByClient(limit, offset, client_id)
  },
  update: async (params) => {
    var result = false;
    var subscription = await SubscriptionHistory.update(params)
    if (subscription) {
      result = true
      await ClientModel.updateSubscription(params)
    }
    return result
  },
  delete: async (params) => {
    return await SubscriptionHistory.delete(params)
  },
  create: async (params) => {
    var result = false;
    var subscription = await SubscriptionHistory.create(params)
    if (subscription) {
      result = true
      await ClientModel.updateSubscription(params)
    }
    return result
  }
}

export {
  subscriptionService
}
