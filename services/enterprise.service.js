import moment from "moment"
import Errors from "../classes/Errors"
import ClientModel from "../models/ClientModel"
import ClientUserModel from "../models/ClientUserModel"
import enterpriseModel from "../models/enterprise.model"
import userModel from "../models/user.model"
import UserModel from "../models/UserModel"
import { getPagination, getPagingData } from "../utils/CommonUtil"
import { subscriptionService } from "./SubscriptionService"

const enterpriseService = {
    addEnterprise: async (props) => {
        const { email, name } = props

        if (!email) {
            throw new Errors.EMAIL_IS_REQUIRED()
        }
        if (!name) {
            throw new Errors.NAME_IS_REQUIRED()
        }
        // Check Email duplicate
        var dupEmail = await UserModel.getByEmail(email)
        if (dupEmail) {
            throw new Errors.EMAIL_ALREADY_EXISTS()
        }

        // Create Client
        var client = await ClientModel.create({ name: name })
        // Create Temporary Subscription
        var currentDate = new moment().format("YYYY-MM-DD")
        var subscription = await subscriptionService.create({ admin_id: props.admin_id, client_id: client.id, from: currentDate, to: currentDate })
        //create User
        var user = await UserModel.createUser({ client_id: client.id, login_id: email, is_active: true })
        // create CLient user
        var clientUser = await ClientUserModel.create({ client_id: client.id, user_id: user.id })
        //create Enterprise
        var enterprise = await enterpriseModel.createEnterprise({ client_id: client.id, name: name, email: email })

        return await UserModel.newEnterpriseAccount(email)
    },
    getAll: async (props) => {


        const { pageIndex, pageSize, email, search } = props

        const { limit, offset } = getPagination(pageIndex, pageSize);

        const paginatedData = await enterpriseModel.getPaginatedItems(limit, offset, email, search)
        // return await accountModel.getAll({email: props.email})
        return getPagingData(paginatedData, pageIndex, limit)


        // return await enterpriseModel.getAll({email: props.email})

    },
    getAllLookUp: async (props) => {
        return await enterpriseModel.getAll()
    },
    get: async (props) => {
        return await enterpriseModel.get(props)


        // return await enterpriseModel.getAll({email: props.email})

    },
    deleteEnterprise: async (props) => {
        await enterpriseModel.deleteEnterprise(props)

    },

}

export default enterpriseService