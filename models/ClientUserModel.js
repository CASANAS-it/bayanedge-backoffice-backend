import { generateId } from '../utils/Crypto'
import mongoose from 'mongoose'
import Database from '../classes/Database'

const customModel = {

  init() {
    const db = Database.getConnection()
    const clientUserSchema = new mongoose.Schema({
      client_id: {
        type: 'String'
      },
      user_id: {
        type: 'String'
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
    })

    customModel.setModel(db.connection.model('client_user', clientUserSchema, 'client_user'))
    return clientUserSchema
  },

  /**
   * Set Model
   */
  setModel: model => {
    customModel.model = model
  },

  /**
   * Get model
   */
  getModel: () => {
    return customModel.model
  },
  getAll: async () => {
    return await customModel.getModel()
      .find()
      .select(['-_id', '-__v'])
      .lean()
  },
  getByUserId: async (user_id) => {
    return await customModel.model.findOne({
      user_id: user_id
    }).lean()
  },
  getByClientId: async (client_id) => {
    return await customModel.model.findOne({
      client_id: client_id
    }).lean()
  },
  update: async (params) => {
    const user = await customModel.model.findOneAndUpdate({ id: params.id }, {
      ...params,
      modified_by: params.admin_id,
      modified_date: new Date(),
    })
    return user
  },
  delete: async (params) => {
    const user = await customModel.model.findOneAndUpdate({ customer_id: params.customer_id }, {
      is_active: false,
      modified_by: params.admin_id,
      modified_date: new Date(),
    })
    return user
  },
  create: async (params) => {
    const id = generateId()
    const customer = new customModel.model({
      ...params,
      id,
      created_by: params.admin_id,
      modified_by: params.admin_id,
      created_date: new Date(),
      modified_date: new Date(),
    })
    return await customer.save()
  }
}

export default {
  ...customModel
}
