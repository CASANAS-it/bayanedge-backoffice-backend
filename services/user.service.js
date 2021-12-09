import Errors from "../classes/Errors"
import jsonwebtoken from 'jsonwebtoken'
import properties from "../properties"
import userModel from "../models/user.model"

const userService = {
    login: async (props) => {
        const { email, password } = props

        if (!email || !password) {
            throw new Errors.UNKNOWN()
        }

        const user = await userModel.getUser({ email, password })

        if (!user) {
            throw new Errors.INVALID_LOGIN()
        }

        const token = jsonwebtoken.sign(user, properties.tokenSecret, {
            expiresIn: 10800 // 3 hours
        })
        return token
    },
    forgotPassword: async (props) => {
        const { email } = props

        if (!email) {
            throw new Errors.UNKNOWN()
        }

        const user = await userModel.getUserByEmail({ email })

        if (!user) {
            throw new Errors.NO_RECORDS_FOUND()
        }

        const token = jsonwebtoken.sign(user, properties.tokenSecret, {
            expiresIn: 10800 // 3 hours
        })
        return token
    },
    validatePassword: async (props) => {
        const { email, password } = props

        if (!email || !password) {
            throw new Errors.UNKNOWN()
        }

        const user = await userModel.getUser({ email, password })

        if (!user) {
            throw new Errors.INVALID_LOGIN()
        }
    },

}

export default userService