import CommonMessage from '../classes/CommonMessage'
import ErrorManager from '../classes/ErrorManager'
import { getPagination, getPagingData } from '../utils/CommonUtil'
import cashJournalService from '../services/cashjournal.service'
import properties from '../properties'

const cashjournalController = {
    init: router => {
        const baseUrl = `${properties.api}/cash-journal`
        router.post(baseUrl + '/get', cashjournalController.get)
        router.post(baseUrl + '/', cashjournalController.getById)
        router.post(baseUrl + '/summary', cashjournalController.getSummary)
        // router.post(baseUrl + '/delete',  customControllers.delete)
    },


    get: async (req, res) => {
        try {

            const { pageIndex, pageSize, client_id, type } = req.body;

            const { limit, offset } = getPagination(pageIndex, pageSize);
            cashJournalService.getAll(limit, offset, client_id, type).then(data => {
                const response = getPagingData(data, pageIndex, limit);
                res.send(
                    new CommonMessage({
                        data: response
                    })
                )
            })

        } catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr)
        }
    },
    getById: async (req, res) => {
        try {

            const { id } = req.body;
            res.send(
                new CommonMessage({
                    data: await cashJournalService.getById(id)
                })
            )
        } catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr)
        }
    },

    getSummary: async (req, res) => {
        try {
            const { id } = req.body;
            res.send(
                new CommonMessage({
                    data: await cashJournalService.getSummary(req.body)
                })
            )
        } catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr)
        }
    },
}

export default cashjournalController