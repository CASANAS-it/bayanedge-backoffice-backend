import Errors from '../classes/Errors'
import { FlowType, TransType } from '../classes/Constants'
import customerModel from '../models/customer.model'
import cashjournalModel from '../models/cashjournal.model'

const cashJournalService = {
  getAll: async (limit, offset, client_id, type) => {
    return await cashjournalModel.getPaginatedItems(limit, offset, client_id, type)
  },
  getById: async (id) => {
    var sales = await cashjournalModel.getById(id)
    if (!sales) {
      throw new Errors.NO_RECORDS_FOUND()
    }
    return sales
  },
  getSummary: async () => {
    var cj = await cashjournalModel.getAll()
    var total = 0;
    var inflowTotal = 0;
    var outflowTotal = 0;
    cj.forEach(element => {
      if (element.flow_type_id === FlowType.INFLOW)
        inflowTotal += element.total
      else
        outflowTotal += element.total
    });
    total = inflowTotal - outflowTotal;
    var result = {
      total: total,
      inflowTotal: inflowTotal,
      outflowTotal: outflowTotal
    }
    return result
  },
  update: async (params) => {
    if (!params.customer_id) {
      var customer = await customerModel.create(params)
      params.customer_id = customer.customer_id
    }

    // revert quantity for inventory
    var oldSales = await cashjournalModel.getById(params.sales_id);
    var revertInventory = await inventoryModel.subtractQuantity({ admin_id: params.admin_id, item_id: oldSales.item_id, quantity: oldSales.quantity })
    // -----------------------------
    var sales = await cashjournalModel.update(params)
    var inventor = await inventoryModel.addQuantity({ admin_id: params.admin_id, item_id: params.item_id, quantity: params.quantity })
    return sales
  },
  delete: async (params) => {
    return await cashjournalModel.delete(params)
  },
  create: async (params) => {
    if (!params.customer_id) {
      var customer = await CustomerModel.create(params)
      params.customer_id = customer.customer_id
    }
    var sales = await cashjournalModel.create(params)
    var inventor = await inventoryModel.addQuantity({ admin_id: params.admin_id, item_id: params.item_id, quantity: params.quantity })

    return sales
  }
}

export default cashJournalService