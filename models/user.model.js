import mongoose from 'mongoose'
import Database from '../classes/Database'
import moment from 'moment'
import { decrypt, encrypt, generateId } from '../utils/Crypto'
import { sendEmail } from '../classes/email'
import { v4 as uuidv4 } from "uuid";
import properties from '../properties';
import mongoosePaginate from 'mongoose-paginate'
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
            email: {
                type: 'String'
            },
            password: {
                type: 'String'
            },

            role: {
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
            firstName: {
                type: 'String'
            },
            middleName: {
                type: 'String'
            },
            lastName: {
                type: 'String'
            },
            isActive: {
                type: 'Boolean'
            },
            activationCode: {
                type: "String"
            },
        })

        customerSchema.plugin(mongoosePaginate)
        customModel.setModel(db.connection.model('backoffice_user', customerSchema))

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
    getAll: async () => {
        return await customModel.getModel()
            .find()
            .select(['-_id', '-__v'])
            .lean()
    },
    getUser: async (props) => {
        const hashPassword = encrypt(props.password)
        const user = await customModel.getModel().findOne({
            email: props.email,
            password: hashPassword
        }).lean()

        if (user) user.password = undefined
        return user
    },
    getUserById: async (props) => {
        const user = await customModel.getModel().findOne({
            id: props.id,
        }).lean()

        if (user) user.password = undefined
        return user
    },
    getPaginatedItems: async (limit, offset, email) => {

        const query = {
            isActive: true
        }

        if (email) {
            query.email = {
                $regex: email
            }
        }
        return await customModel.getModel().paginate(query, { offset: offset, limit: limit })
    },
    getUserByEmail: async (props) => {
        const { email, } = props
        return await customModel.getModel().findOne({ email, }).lean()
    },

    getUserByEmailId: async (props) => {
        const { email, id } = props
        return await customModel.getModel().findOne({ email, id: { $ne: id } }).lean()
    },
    addUser: async (props) => {

        const id = generateId()
        const user = new customModel.model({
            ...props,
            id: id,
            isActive: true,
            createdDate: new Date(),
            modifiedDate: new Date()
        })
        return await user.save()
    },
    addAdminUser: async () => {
        const id = generateId()
        const user = new customModel.model({
            id: id,
            email: "bayanedge@email.com",
            password: encrypt('password'),
            role: "SuperAdmin",
            firstName: "Admin",
            lastName: "Admin",
            isActive: true,
            activationCode: "",
            createdDate: new Date(),
            modifiedDate: new Date()
        })
        await user.save()
    },
    async getByActivationCode(id) {
        let model = await customModel.model.findOne({ activationCode: id });
        if (model) {
            model.password = decrypt(model.password)
        }
        return model;
    },

    async initForgotPassword(id) {
        let item = await customModel.model.findOne({ email: id });
        if (item) {
            item.activationCode = uuidv4();

            var mailOptions = {
                from: "MoneyFlow <" + properties.transporter.username + ">",
                to: id,
                subject: 'Forgot password',
                html: 'Click <a href="' + properties.hostName + '#/change_password/' + item.activationCode + '">here</a> to set password'
            }
            //send email
            sendEmail(mailOptions);
        }

        return await customModel.model.findOneAndUpdate({ email: id }, item, { 'new': true });
    },

    updatePassword: async (idUser, password) => {
        let user = await customModel.model.findOneAndUpdate({ id: idUser }, {
            password: encrypt(password),
            activationCode: ''
        });
        return user;
    },

    deleteAccount: async (props) => {
        await customModel.model.findOneAndUpdate({ id: props.id }, {
            isActive: false,
            modified_date: new Date(),
        })
    },
    updateAccount: async (props) => {
        await customModel.model.findOneAndUpdate({ id: props.id }, {
            email: props.email,
            role: props.role,
            modified_date: new Date(),
        })
    },

}

export default {
    ...customModel
}
