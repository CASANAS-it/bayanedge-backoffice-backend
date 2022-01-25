import { FlowType, TransType } from '../classes/Constants'
import Errors from '../classes/Errors'
import cashjournalModel from '../models/cashjournal.model'
import { padZeroes } from '../utils/CommonUtil'

const cashInflowService = {
  getAll: async (limit, offset, client_id) => {
    return await cashjournalModel.getPaginatedItems(limit, offset, client_id, FlowType.INFLOW)
  },
  getById: async (id) => {
    var cashInflow = await cashjournalModel.getById(id)
    if (!cashInflow) {
      throw new Errors.NO_RECORDS_FOUND()
    }
    return cashInflow
  },
  update: async (params) => {
    var transaction = JSON.parse(JSON.stringify(params));;
    transaction.details = params;
    transaction.flow_type_id = FlowType.INFLOW
    return await cashjournalModel.update(transaction)
  },
  delete: async (params) => {
    return await cashjournalModel.delete(params)
  },
  create: async (params) => {
    var initial;
    switch (params.type_id) {
      case "Microsavings":
        initial = "MW"
        break;
      case "Other Cash Income":
        initial = "OC"
      default:
        break;
    }

    var displayId = initial + "000001";
    var lastDisplay = await cashjournalModel.getLastDisplayId(params.client_id, params.type_id, FlowType.INFLOW)

    if (lastDisplay) {
      var disId = lastDisplay.display_id
      disId = parseInt(disId.substring(2)) + 1;
      displayId = initial + padZeroes(disId)
    }

    var transaction = JSON.parse(JSON.stringify(params));;
    transaction.details = params;
    transaction.flow_type_id = FlowType.INFLOW
    transaction.display_id = displayId;
    return await cashjournalModel.create(transaction)
  }
}

export default cashInflowService