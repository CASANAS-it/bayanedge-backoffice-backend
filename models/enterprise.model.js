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
            id: {
                type: 'String'
            },
            client_id: {
                type: 'String'
            },
            name: {
                type: 'String'
            },
            owner: {
                type: 'String'
            },
            type_of_ownership: {
                type: "String"
            },
            industry: {
                type: 'String'
            },
            main_product: {
                type: 'String'
            },
            home_address: {
                type: 'String'
            },
            business_address: {
                type: 'String'
            },
            landline: {
                type: 'String'
            },
            mobile_number: {
                type: 'String'
            },
            email: {
                type: 'String'
            },
            website: {
                type: 'String'
            },
            year_established: {
                type: 'String'
            },
            years_of_existence: {
                type: 'String'
            },
            registration: {
                type: 'String'
            },
            registration_date: {
                type: 'String'
            },
            tin: {
                type: 'String'
            },
            sss: {
                type: 'String'
            },
            phic_no: {
                type: 'String'
            },
            salaried_workers: {
                type: 'String'
            },
            membership_date: {
                type: 'String'
            },
            edge_officer: {
                type: 'String'
            },
            team_leader: {
                type: 'String'
            },
            branch_name: {
                type: 'String'
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
        })

        customerSchema.plugin(mongoosePaginate)
        customModel.setModel(db.connection.model('enterprise', customerSchema))

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
        const { email } = props
        return await customModel.getModel().findOne({ email, password }).lean()
    },
    getUserByEmail: async (props) => {
        const { email, } = props
        return await customModel.getModel().findOne({ email, }).lean()
    },
    addUser: async (props) => {
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
        return await customModel.getModel().find(query, { __v: 0 }).lean()
    },
    get: async (props) => {
        return await customModel.getModel().findOne({ _id: props.id }).lean()
    },
    getPaginatedItems: async (limit, offset, email,search) => {

        const query = {
            is_active: true,
            name: { "$exists": true, "$ne": "" }
        }

        if (email) {
            query.email = {
                $regex: email
            }
        }
        
        if (search) {
            query.name = {
                $regex: search,$options: 'i'
            }
        }
        
        var options = {
            populate: 'parent',
            lean: true,
            offset: offset, limit: limit, sort: { name: 1 }
        }
        return await customModel.getModel().paginate(query, options)

    },
    getAll: async () => {
        const customer = await customModel.model
            .find({
            }, [], { sort: { name: 1 } })
            .lean()
        return customer
    },
    deleteEnterprise: async (props) => {
        await customModel.model.findOneAndUpdate({ _id: props._id }, {
            is_active: false,
            modified_date: new Date(),
        })
    },
    updateEnterprise: async (props) => {
        await customModel.model.findOneAndUpdate({ _id: props._id }, {
            email: props.email,
            modified_date: new Date(),
        })
    },

    createEnterprise: async (params) => {
        const id = generateId()
        const customer = new customModel.model({
          id: id,
          client_id : params.client_id,
          name : params.name,
          email : params.email,
          is_active : true,
          created_by: params.admin_id,
          created_date: new Date(),
          modified_by: params.admin_id,
          modified_date: new Date(),
        })
        return await customer.save()
    
      }

}

export default {
    ...customModel
}
