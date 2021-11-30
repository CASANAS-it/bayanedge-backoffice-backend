import CommonMessage from "../classes/CommonMessage"
import ErrorManager from "../classes/ErrorManager"
import properties from "../properties";
import enterpriseService from "../services/enterprise.service";
const enterpriseController = {
    init: router => {
        const baseUrl = `${properties.api}/enterprise`;
        // router.post(baseUrl + '/add', enterpriseController.addEnterprise)
        // router.get(baseUrl, enterpriseController.getAll)


        router.post(baseUrl + '/add', enterpriseController.addEnterprise)
        router.post(baseUrl + '/delete', enterpriseController.deleteEnterprise)
        router.post(baseUrl + '', enterpriseController.getAll)
        router.post(baseUrl + '/get', enterpriseController.get)
    },
    addEnterprise: async (req, res) => {
        try {

            await enterpriseService.addEnterprise(req.body)
            res.send(new CommonMessage({}))
        }
        catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr.body)
        }
    },

    getAll: async (req, res) => {
        try {


            res.send(new CommonMessage({ data: await enterpriseService.getAll(req.body) }))
        }
        catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr.body)
        }
    },

    get: async (req, res) => {
        try {


            res.send(new CommonMessage({ data: await enterpriseService.get(req.body) }))
        }
        catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr.body)
        }
    },

    deleteEnterprise: async (req, res) => {
        try {
            await enterpriseService.deleteEnterprise(req.body)
            res.send(new CommonMessage({}))
        }
        catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr.body)
        }
    }
}



export default enterpriseController