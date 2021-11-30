import mongoose from 'mongoose'
import Database from '../classes/Database'
import moment from 'moment'
import mongoosePaginate from 'mongoose-paginate'

const customModel = {

    init() {
        const db = Database.getConnection()

        /**
          * Customer
          */
        const customerSchema = new mongoose.Schema({
            email: {
                type: 'String'
            },
            createdDate: {
                type: 'String'
            },
            modifiedDate: {
                type: 'String'
            },
            role: {
                type: 'String'
            },
            is_active: {
                type: 'boolean'
            }
        })

        customerSchema.plugin(mongoosePaginate)
        customModel.setModel(db.connection.model('account', customerSchema))

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
    addAccount: async (props) => {
        const user = new customModel.model({
            ...props,
            is_active: true,
            createdDate: new Date(),
            modifiedDate: new Date()
        })
        await user.save()
    },
    getAll: async (props) => {
        const query = {}

        if (props.email) {
            query.email = {
                $regex: props.email
            }
        }
        return await customModel.getModel().find(query, { __v: 0, password: 0 }).lean()

    },
    get: async (props) => {
        return await customModel.getModel().findOne({ _id: props.id }).lean()

    },
    getPaginatedItems: async (limit, offset, email) => {

        const query = {
            is_active: true
        }

        if (email) {
            query.email = {
                $regex: email
            }
        }
        return await customModel.getModel().paginate(query, { offset: offset, limit: limit })
    },
    deleteAccount: async (props) => {
        await customModel.model.findOneAndUpdate({ _id: props._id }, {
            is_active: false,
            modified_date: new Date(),
        })
    },
    updateAccount: async (props) => {
        await customModel.model.findOneAndUpdate({ _id: props._id }, {
            email: props.email,
            role: props.role,
            modified_date: new Date(),
        })
    },

}

export default {
    ...customModel
}
