import Logger from '../classes/Logger'
import ClientModel from '../models/ClientModel'
import enterpriseModel from '../models/enterprise.model'
import userModel from '../models/user.model'
import { subscriptionService } from './SubscriptionService'


const initializeService = {

  init: async () => {
    const count = await userModel.getAll()
    if (count.length === 0) {
      Logger.info('INITIALIZATION STARTED')
      await initializeService.initializeData()
    }

    // await setInitialSubscription()

  },


  initializeData: async () => {


    Logger.info('********************************')
    Logger.info('****Initializing Data****')
    Logger.info('********************************')


    await initUser()

    Logger.info('********************************')
    Logger.info('****Finished Initializing Data****')
    Logger.info('********************************')
  }
}


async function setInitialSubscription() {
  var allClients = await enterpriseModel.getAll()
  for (let index = 0; index < allClients.length; index++) {
    const element = allClients[index];
    var request = {
      client_id : element.client_id,
      from: "2022-08-01",
      to: "2022-08-31",
    }
    await subscriptionService.create(request)
  } 
}
async function initUser() {
  Logger.info('******************************')
  Logger.info('****Initializing User****')
  Logger.info('******************************')

  await userModel.addAdminUser()
}

export default initializeService
