import CommonMessage from '../classes/CommonMessage'
import ErrorManager from '../classes/ErrorManager'
import { getPagination, getPagingData } from '../utils/CommonUtil'
import properties from '../properties'
import cashInflowService from '../services/cashinflow.service'

const cashinController = {
    init: router => {
        const baseUrl = `${properties.api}/cash-inflow`
        router.post(baseUrl + '/get', cashinController.get)
        router.post(baseUrl + '/save', cashinController.save)
        router.post(baseUrl + '/', cashinController.getById)
        router.post(baseUrl + '/delete', cashinController.delete)
    },


    get: async (req, res) => {
        try {

            const { pageIndex, pageSize, client_id } = req.body;
            const { limit, offset } = getPagination(pageIndex, pageSize);
            cashInflowService.getAll(limit, offset, client_id).then(data => {
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
                    data: await cashInflowService.getById(id)
                })
            )
        } catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr)
        }
    },
    save: async (req, res) => {
        try {
            var data;
            if (!req.body.transaction_id) {
                data = await cashInflowService.create(req.body)
            } else {
                data = await cashInflowService.update(req.body)
            }
            res.send(
                new CommonMessage({
                    data: data
                })
            )
        } catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr)
        }
    },
    delete: async (req, res) => {
        try {
            var data = await cashInflowService.delete(req.body)

            res.send(
                new CommonMessage({
                    data: data
                })
            )
        } catch (err) {
            const safeErr = ErrorManager.getSafeError(err)
            res.status(safeErr.status).json(safeErr)
        }
    },
}

export default cashinController
