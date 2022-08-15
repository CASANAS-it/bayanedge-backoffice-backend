import mongoose, { Query } from 'mongoose'
import Database from '../classes/Database'
import moment from 'moment'
import mongoosePaginate from 'mongoose-paginate'
import { generateId } from '../utils/Crypto'

const customModel = {

    init() {
        const db = Database.getConnection()

        /**
          * Customer
          */
        const customerSchema = new mongoose.Schema({
            transaction_id: {
                type: 'String'
            },
            display_id: {
                type: 'String'
            },
            client_id: {
                type: 'String'
            },
            from: {
                type: 'String'
            },
            to: {
                type: 'String'
            },
            createdDate: {
                type: 'String'
            },
            modifiedDate: {
                type: 'String'
            }
        })

        customerSchema.virtual('enterprise', {
            ref: 'enterprise',
            localField: 'client_id',
            foreignField: 'client_id',
            justOne: true // for many-to-1 relationships
        });
        customerSchema.plugin(mongoosePaginate)
        customModel.setModel(db.connection.model('subscription_history', customerSchema))

        return customerSchema
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

    getPaginatedItems: async (limit, offset) => {
        var options = {
            populate: ['enterprise'],
            lean: true,
            offset: offset, limit: limit,
            sort: { from: 1 }
        }
        return await customModel.getModel().paginate({}, options)
        // return await customModel.getModel().find().select().populate('item').populate('customer').lean()
    },

    getPaginatedItemsByClient: async (limit, offset, client_id) => {
        var options = {
            populate: ['enterprise'],
            lean: true,
            offset: offset, limit: limit,
            sort: { from: 1 }
        }
        return await customModel.getModel().paginate({ client_id: client_id }, options)
        // return await customModel.getModel().find().select().populate('item').populate('customer').lean()
    },

    update: async (params) => {
        const user = await customModel.model.findOneAndUpdate({ transaction_id: params.transaction_id }, {
            ...params,
            modified_by: params.admin_id,
            modified_date: new Date(),
        })
        return user
    },

    delete: async (id) => {
        const user = await customModel.getModel().deleteOne(
            { transaction_id: id })
        return user
    },

    create: async (props) => {
        const id = generateId()
        const item = new customModel.model({
            ...props,
            transaction_id: id,
            display_id: moment().format('YYYYMMDDHHmmss'),
        })
        return await item.save()
    },
}

export default {
    ...customModel
}
