import Errors from "../classes/Errors"
import enterpriseModel from "../models/enterprise.model"

const enterpriseService = {
    addEnterprise: async (props) => {
        const { email } = props

        if (!email) {
            throw new Errors.EMAIL_IS_REQUIRED()
        }

        await enterpriseModel.addUser(props)

    },
    getAll: async (props) => {
        return await enterpriseModel.getAll({email: props.email})

    }

}

export default enterpriseService