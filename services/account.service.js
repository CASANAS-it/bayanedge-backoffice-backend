import Errors from "../classes/Errors"
import accountModel from "../models/account.model"
import userModel from "../models/user.model"
import { getPagination, getPagingData } from "../utils/CommonUtil"

const accountService = {
    addAccount: async (props) => {
        const { email, id } = props

        if (!email) {
            throw new Errors.EMAIL_IS_REQUIRED()
        }
        // Check if existing
        var dupUser = await userModel.getUserByEmailId(props)
        if (dupUser) {
            throw new Errors.EMAIL_ALREADY_EXISTS()
        }

        if (id)
            return await userModel.updateAccount(props)
        else
            return await userModel.addUser(props)
    },
    getAll: async (props) => {
        const { pageIndex, pageSize, email } = props

        const { limit, offset } = getPagination(pageIndex, pageSize);

        const paginatedData = await userModel.getPaginatedItems(limit, offset, email)
        // return await accountModel.getAll({email: props.email})
        return getPagingData(paginatedData, pageIndex, limit)

    },
    get: async (props) => {
        return await userModel.getUserById(props)
    },
    deleteAccount: async (props) => {

        await userModel.deleteAccount(props)

    }


}

export default accountService