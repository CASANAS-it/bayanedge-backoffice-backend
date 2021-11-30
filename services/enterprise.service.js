import Errors from "../classes/Errors"
import enterpriseModel from "../models/enterprise.model"
import { getPagination, getPagingData } from "../utils/CommonUtil"

const enterpriseService = {
    addEnterprise: async (props) => {
        const { email } = props

        if (!email) {
            throw new Errors.EMAIL_IS_REQUIRED()
        }

        if (props._id) {
            await enterpriseModel.updateEnterprise(props)
        } else {
            delete props._id
            await enterpriseModel.addUser(props)
        }

    },
    getAll: async (props) => {


        const { pageIndex, pageSize, email } = props

        const { limit, offset } = getPagination(pageIndex, pageSize);

        const paginatedData = await enterpriseModel.getPaginatedItems(limit, offset, email)
        // return await accountModel.getAll({email: props.email})
        return getPagingData(paginatedData, pageIndex, limit)


        // return await enterpriseModel.getAll({email: props.email})

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