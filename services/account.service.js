import Errors from "../classes/Errors"
import accountModel from "../models/account.model"
import { getPagination, getPagingData } from "../utils/CommonUtil"

const accountService = {
    addAccount: async (props) => {
        const { email } = props

        if (!email) {
            throw new Errors.EMAIL_IS_REQUIRED()
        }

        await accountModel.addAccount(props)

    },
    getAll: async (props) => {
        const {pageIndex, pageSize, email} = props        

        const { limit, offset } = getPagination(pageIndex, pageSize);

        const paginatedData = await accountModel.getPaginatedItems(limit, offset, email)
        // return await accountModel.getAll({email: props.email})
        return getPagingData(paginatedData, pageIndex, limit)

    },
    get: async (props) => {
        const {pageNo, pageSize, email} = props        

        const { limit, offset } = getPagination(pageNo, pageSize);

        const paginatedData = await accountModel.getPaginatedItems(limit, offset, email)
        // return await accountModel.getAll({email: props.email})
        return getPagingData(paginatedData, pageNo, limit)

    }
    

}

export default accountService