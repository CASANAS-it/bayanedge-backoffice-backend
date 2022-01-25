import mongoose from 'mongoose'
import Database from '../classes/Database'
import { generateId, } from '../utils/Crypto'
import mongoosePaginate from 'mongoose-paginate'

const customModel = {

  init() {
    const db = Database.getConnection()
    const itemSchema = new mongoose.Schema({
      transaction_id: {
        type: 'String'
      },
      reference_id: {
        type: 'String'
      },
      display_id: {
        type: 'String'
      },
      client_id: {
        type: 'String',
      },
      details: {
        type: 'Object'
      },
      type_id: {
        type: 'String'
      },
      flow_type_id: {
        type: 'String',
      },
      date: {
        type: 'String'
      },
      total: {
        type: "Number"
      },
      is_active: {
        type: 'Boolean'
      },
      created_by: {
        type: 'String'
      },
      created_date: {
        type: 'Date'
      },
      modified_by: {
        type: 'String'
      },
      modified_date: {
        type: 'Date'
      },
    },
      {
        toObject: { virtuals: true },
      })


    itemSchema.virtual('customer', {
      ref: 'customers',
      localField: 'customer_id',
      foreignField: 'customer_id',
      justOne: true // for many-to-1 relationships
    });

    itemSchema.virtual('vendor', {
      ref: 'vendors',
      localField: 'vendor_id',
      foreignField: 'vendor_id',
      justOne: true // for many-to-1 relationships
    });

    itemSchema.virtual('item', {
      ref: 'items',
      localField: 'details.item_id',
      foreignField: 'item_id',
      justOne: true // for many-to-1 relationships
    });

    itemSchema.plugin(mongoosePaginate)
    customModel.setModel(db.connection.model('cash_journal', itemSchema))

    return itemSchema
  },
  setModel: model => {
    customModel.model = model
  },
  getModel: () => {
    return customModel.model
  },
  getAll: async () => {
    return await customModel.getModel()
      .find()
      .select(['-_id', '-__v'])
      .lean()
  },
  getAllByClientId: async (id) => {
    const items = await customModel.model
      .find({
        client_id: id,
      })
      .lean()
    return items
  },
  getByClientId: async (id) => {
    const items = await customModel.model
      .findOne({
        client_id: id,
      })
      .lean()
    return items
  },
  getLastDisplayId: async (client_id, type_id, flow_type_id) => {
    const items = await customModel.model
      .findOne({
        client_id: client_id,
        type_id: type_id,
        flow_type_id: flow_type_id
      })
      .lean()
    return items
  },
  getPaginatedItems: async (limit, offset, client_id, type_id) => {

    var options = {
      populate: ['item'],
      lean: true,
      offset: offset, limit: limit
    }

    var condition = { flow_type_id: type_id };
    return await customModel.getModel().paginate({ is_active: true, client_id: client_id, ...condition }, options)

    // return await customModel.getModel().find().select().populate('item').populate('customer').lean()
  },
  getById: async (id) => {
    const item = await customModel.model
      .findOne({
        transaction_id: id,
        is_active: true
      })
      .lean()
    return item
  },

  update: async (params) => {
    const user = await customModel.model.findOneAndUpdate({ transaction_id: params.transaction_id }, {
      client_id: params.client_id,
      details: params.details,
      total: params.total,
      type_id: params.type_id,
      date: params.date,
      modified_by: params.admin_id,
      modified_date: new Date(),
    })
    return user
  },
  updateByReferenceId: async (params) => {
    const user = await customModel.model.findOneAndUpdate({ reference_id: params.reference_id }, {
      client_id: params.client_id,
      details: params.details,
      total: params.total,
      type_id: params.type_id,
      date: params.date,
      modified_by: params.admin_id,
      modified_date: new Date(),
    })
    return user
  },
  delete: async (params) => {
    const user = await customModel.model.findOneAndUpdate({ transaction_id: params.transaction_id }, {
      is_active: false,
      modified_by: params.admin_id,
      modified_date: new Date(),
    })
    return user
  },

  permanentDelete: async (id) => {
    const user = await customModel.model.deleteOne(
      { transaction_id: id })
    return user
  },

  permanentDeleteByRefId: async (id) => {
    const user = await customModel.model.deleteOne(
      { reference_id: id })
    return user
  },
  create: async (params) => {
    const id = generateId()
    const item = new customModel.model({
      transaction_id: id,
      display_id: params.display_id,
      reference_id: params.reference_id,
      client_id: params.client_id,
      details: params.details,
      total: params.total,
      type_id: params.type_id,
      flow_type_id: params.flow_type_id,
      date: params.date,
      is_active: true,
      created_by: params.admin_id,
      created_date: new Date(),
      modified_by: params.admin_id,
      modified_date: new Date(),
    })
    return await item.save()

  }
}

export default {
  ...customModel
}