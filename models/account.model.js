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
            createdDate: new Date(),
            modifiedDate: new Date()
        })
        await user.save()
    },
    getAll: async (props) => {
        const query = {}
        
        if(props.email) {
            query.email =  {
               $regex: props.email
            }
        }
        return await customModel.getModel().find(query, { _id: 0, __v: 0, password: 0 }).lean()

    },

}

export default {
    ...customModel
}
