import CommonMessage from "../classes/CommonMessage"
import ErrorManager from "../classes/ErrorManager"
import properties from "../properties"
import initializeService from "../services/initial.service"
import userService from "../services/user.service"

// Security
import { authorize } from '../security/SecurityManager'
import userModel from "../models/user.model"
import Errors from "../classes/Errors"


const userController = {
  init: router => {
    router.post(properties.api + '/user/login', userController.login)
    router.post(properties.api + '/user/forgot-password', userController.forgotPassword)
    router.post(properties.api + '/user/validate-password',authorize(), userController.validatePassword),
      router.post(
        properties.api + '/user/change-password',
        authorize([]),
        userController.changePassword
      )
    router.get(properties.api + "/user/forgot-password/:id", userController.initForgotPassword);
    router.post(properties.api + "/user/change-password-via-activation-code", userController.changePasswordViaActivationCode);

  },

  login: async (req, res) => {
    try {
      await initializeService.init()
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
          data: await userService.validatePassword(req.body)
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
  changePassword: async (req, res) => {
    try {
      const user = await userModel.getByIdAndPassword(
        req.body.admin_id,
        req.body.currentPassword
      )
      if (!user) {
        throw new Errors.INVALID_CURRENT_PASSWORD()
      }
      await userModel.updatePassword(req.body.admin_id, req.body.password)
      res.send(
        new CommonMessage({
        })
      )
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr)
    }
  },
  initForgotPassword: async (req, res) => {
    try {
      const result = await userModel.initForgotPassword(req.params.id);
      if (result != null) {
        res.json({ response_code: 0, response_message: "Successful" })
      } else {
        res.json({ response_code: -1, response_message: "User does not exists" })
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.response_code).json(safeErr);
    }
  },
  changePasswordViaActivationCode: async (req, res) => {
    try {
      let model = await userModel.getByActivationCode(req.body.activation_code);
      if (model) {
        model.activation_code = '';
        model.password = req.body.password;

        let user = await userModel.updatePassword(model.id, req.body.password);

        if (!user) {
          throw new Errors.CHANGE_PASSWORD_FAILED()
        } else {
          res.send(
            new CommonMessage({
            })
          )
        }
      } else {
        res.json({ response_code: -1, response_message: "Link expired", })

      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.response_code).json(safeErr);
    }
  },
}



export default userController