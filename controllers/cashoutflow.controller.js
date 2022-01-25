import CommonMessage from '../classes/CommonMessage'
import ErrorManager from '../classes/ErrorManager'
import { cashOutflowService } from '../services/cashoutflow.service'
import { getPagination, getPagingData } from '../utils/CommonUtil'
import properties from '../properties'

const cashoutController = {
    init: router => {
        const baseUrl = `${properties.api}/cash-outflow`
        router.post(baseUrl + '/get', cashoutController.get)
        router.post(baseUrl + '/save', cashoutController.save)
        router.post(baseUrl + '/', cashoutController.getById)
        router.post(baseUrl + '/delete', cashoutController.delete)
    },


    get: async (req, res) => {
        try {

            const { pageIndex, pageSize, client_id } = req.body;
            const { limit, offset } = getPagination(pageIndex, pageSize);
            cashOutflowService.getAll(limit, offset, client_id).then(data => {
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
                    data: await cashOutflowService.getById(id)
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
                data = await cashOutflowService.create(req.body)
            } else {
                data = await cashOutflowService.update(req.body)
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
            var data = await cashOutflowService.delete(req.body)

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

export default cashoutController
