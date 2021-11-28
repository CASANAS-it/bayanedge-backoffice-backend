import CommonMessage from "../classes/CommonMessage"
import ErrorManager from "../classes/ErrorManager"
import properties from "../properties"
import accountService from "../services/account.service"

const accountController = {
  init: router => {
    router.post(properties.api + '/account/add', accountController.addAccount)
    router.post(properties.api + '/account', accountController.getAll)
    router.post(properties.api + '/account/get', accountController.get)
  },
  addAccount: async (req, res) => {
    try {

      await accountService.addAccount(req.body)
      res.send(new CommonMessage({}))
    }
    catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr.body)
    }
  },

  getAll: async (req, res) => {
    try {


      res.send(new CommonMessage({ data: await accountService.getAll(req.body) }))
    }
    catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr.body)
    }
  },

  get: async (req, res) => {
    try {


      res.send(new CommonMessage({ data: await accountService.get(req.body) }))
    }
    catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr.body)
    }
  }
}



export default accountController