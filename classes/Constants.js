
const CustomerType = Object.freeze({
  COORDINATOR: { code: 'COOR', name: 'Coordinator' },
  CUSTOMER: { code: 'CUST', name: 'Customer' }
})

const TransactionType = Object.freeze({
  BUY: { code: '01', name: 'Buy' },
  CASHOUT: { code: '02', name: 'Cashout' },
  LOGIN: { code: '03', name: 'Login' },
  GET_REFERENCE_CODE: { code: '04', name: 'Request Reference Code' }
})

const MerchantType = Object.freeze({
  FINTECH: { code: 'FINTECH', name: 'Fintech' },
  LEISURE: { code: 'LEISURE', name: 'Leisure' }
})

const UserType = Object.freeze({
  E_SYS_ADM: { code: 'E_SYS_ADM', name: 'eVoucher Admin' },
  E_STAFF: { code: 'E_STAFF', name: 'eVoucher Staff' },
  MER_ADM: { code: 'MER_ADM', name: 'Merchant Admin' },
  MER_STAFF: { code: 'MER_STAFF', name: 'Merchant Staff' }
})

const SETTINGS = Object.freeze({
  PITMASTER_URL: '001',
  PITMASTER_USERNAME: '002',
  PITMASTER_PASSWORD: '003',
  PITMASTER_AUTHKEY: '004',
  MINI_APP_MERCHANT: '005'
})

const ACCESS_LEVELS = Object.freeze({
  API: 'API',
  MINI_APP: 'MINI_APP'
})

const PITMASTER_CUSTOMER_STATUS = Object.freeze({
  UNPROCESSED: 'UNPROCESSED',
  PROCESSED: 'PROCESSED'
})

const TRANSACTION_FEE_TYPE = Object.freeze({
  MTF: 'MTF',
  NMTF: 'NMTF'
})

export {
  CustomerType,
  TransactionType,
  MerchantType,
  UserType,
  SETTINGS,
  ACCESS_LEVELS,
  PITMASTER_CUSTOMER_STATUS,
  TRANSACTION_FEE_TYPE
}
