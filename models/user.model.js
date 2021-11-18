import mongoose from 'mongoose'
import Database from '../classes/Database'
import moment from 'moment'

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
            password: {
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
            }
        })

        customModel.setModel(db.connection.model('user', customerSchema))

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
    getUser: async (props) => {
        const { email, password } = props
        return await customModel.getModel().findOne({ email, password }).lean()
    },
    getUserByEmail: async (props) => {
        const { email, } = props
        return await customModel.getModel().findOne({ email, }).lean()
    },
    addUser: async (props) => {
        const user = new customModel.model({
            ...props,
            createdDate: new Date(),
            modifiedDate: new Date()
        })
        await user.save()
    },
    getAll: async () => {
        return await customModel.getModel().find({}, { _id: 0, __v: 0, password: 0 }).lean()
    },

}

export default {
    ...customModel
}
