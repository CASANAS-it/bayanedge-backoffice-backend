import Errors from "../classes/Errors"
import accountModel from "../models/account.model"
import { getPagination, getPagingData } from "../utils/CommonUtil"

const accountService = {
    addAccount: async (props) => {
        const { email } = props

        if (!email) {
            throw new Errors.EMAIL_IS_REQUIRED()
        }

        if (props._id) {
            await accountModel.updateAccount(props)
        } else {
            delete props._id
            await accountModel.addAccount(props)
        }

    },
    getAll: async (props) => {
        const { pageIndex, pageSize, email } = props

        const { limit, offset } = getPagination(pageIndex, pageSize);

        const paginatedData = await accountModel.getPaginatedItems(limit, offset, email)
        // return await accountModel.getAll({email: props.email})
        return getPagingData(paginatedData, pageIndex, limit)

    },
    get: async (props) => {
        return await accountModel.get(props)
    },
    deleteAccount: async (props) => {

        await accountModel.deleteAccount(props)

    }


}

export default accountService