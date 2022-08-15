
// Properties
import Properties from '../properties'

// Database
// import UserModel from '../models/UserModel'

// Security
import { authorize } from '../security/SecurityManager'

import CommonMessage from '../classes/CommonMessage'
// Errors
import Errors from '../classes/Errors'
import ErrorManager from '../classes/ErrorManager'
import { salesService } from '../services/SalesService'
import { UserType } from '../classes/Constants'
import { getPagination, getPagingData } from '../utils/CommonUtil'
import { subscriptionService } from '../services/SubscriptionService'

const customControllers = {
    init: router => {
        const baseUrl = `${Properties.api}/subscription`
        router.post(baseUrl + '/get', authorize(), customControllers.get)
        router.post(baseUrl + '/save', authorize(), customControllers.save)
        router.post(baseUrl + '/delete', authorize(), customControllers.delete)
    },


    get: async (req, res) => {
        try {

            const { pageIndex, pageSize, client_id, filter } = req.body;

            const { limit, offset } = getPagination(pageIndex, pageSize);

            if (client_id)
                subscriptionService.getAllByClient(limit, offset,client_id).then(data => {
                    const response = getPagingData(data, pageIndex, limit);
                    res.send(
                        new CommonMessage({
                            data: response
                        })
                    )
                })
            else
                subscriptionService.getAll(limit, offset).then(data => {
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
    getByClientId: async (req, res) => {
        try {

            const { pageIndex, pageSize, client_id } = req.body;

            const { limit, offset } = getPagination(pageIndex, pageSize);

            subscriptionService.getAllByClient(limit, offset, client_id).then(data => {
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
    save: async (req, res) => {
        try {
            var data;
            if (!req.body.transaction_id) {
                data = await subscriptionService.create(req.body)
            } else {
                data = await subscriptionService.update(req.body)
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
            var data = await subscriptionService.delete(req.body)

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

export default {
    ...customControllers
}
