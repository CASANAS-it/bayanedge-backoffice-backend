import Errors from "../classes/Errors"
import accountModel from "../models/account.model"

const accountService = {
    addAccount: async (props) => {
        const { email } = props

        if (!email) {
            throw new Errors.EMAIL_IS_REQUIRED()
        }

        await accountModel.addAccount(props)

    },
    getAll: async (props) => {
        return await accountModel.getAll({email: props.email})

    }

}

export default accountService