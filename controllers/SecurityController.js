import Properties from '../properties'
import Errors from '../classes/Errors'
import { ErrorManager } from '../classes/ErrorManager'
const securityControllers = {
  init: (router) => {
    const baseUrl = `${Properties.api}`
  },
  authenticate: async (req, res) => {
    try {
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr.body)
    }
  },
  authenticateToken: async (req, res) => {
    try {
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err)
      res.status(safeErr.status).json(safeErr.body)
    }
  }

}

export default securityControllers
