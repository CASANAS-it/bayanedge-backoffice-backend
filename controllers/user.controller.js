import CommonMessage from "../classes/CommonMessage"
import ErrorManager from "../classes/ErrorManager"
import properties from "../properties"
import userService from "../services/user.service"

const userController = {
  init: router => {
    router.post(properties.api + '/user/login', userController.login)
    router.post(properties.api + '/user/forgot-password', userController.forgotPassword)
    router.post(properties.api + '/user/validate-password', userController.login)
  },

  login: async (req, res) => {
    try {

      res.send(
        new CommonMessage({
          data: await userService.login(req.body)
        })
      )
    }
    catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr.body)
    }
  },

  validatePassword: async (req, res) => {
    try {

      res.send(
        new CommonMessage({
          data: await userService.login(req.body)
        })
      )
    }
    catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr.body)
    }
  },

  forgotPassword: async (req, res) => {
    try {

      await userService.forgotPassword(req.body)
      res.send(new CommonMessage({}))
    }
    catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr.body)
    }
  },
}



export default userController