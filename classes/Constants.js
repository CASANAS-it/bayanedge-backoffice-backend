
const CustomerType = Object.freeze({
  COORDINATOR: { code: 'COOR', name: 'Coordinator' },
  CUSTOMER: { code: 'CUST', name: 'Customer' }
})

// const TransactionType = Object.freeze({
//   BUY: { code: '01', name: 'Buy' },
//   CASHOUT: { code: '02', name: 'Cashout' },
//   LOGIN: { code: '03', name: 'Login' },
//   GET_REFERENCE_CODE: { code: '04', name: 'Request Reference Code' }
// })

const Config = Object.freeze({
  PAYMENT_TERMS : 30, // in days
  SERVICE_FEE_PERCENT : 0.02
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

const TransactionType = Object.freeze({
  CASH: 'Cash',
  ACCOUNT: 'Account',
})

const FlowType = Object.freeze({
  INFLOW: 'Inflow',
  OUTFLOW: 'Outflow',
})

const TransType = Object.freeze({
  SALES : "Sales",
  ORDER : "Order",
  LEDGER : "Ledger",
  ACCOUNTS_PAYABLE : 'Accounts Payable',
  ACCOUNTS_RECEIVABLE : 'Accounts Receivable',
  MICROSAVINGS : "Microsavings",
  DRAWINGS: "Drawings",
  LOANS_PROCEED : "Loans Proceed",
  LOANS_PAYABLE : "Loans Payable",
  NEW_LOANS : "New Loans",
  OTHER_CASH_INCOME: "Other Cash Income",
  OPERATING_EXPENSE : "Operating Expense",
  OTHER_INCOME : "Other Income",
  INVENTORY : "Inventory",
  CASH_ON_HAND : "Cash on Hand",
  NON_FINANCIAL_CHARGES : "Non-financial Charges",
  NON_OPERATING_EXPENSE : "Non-Operating Expense"
})


const AssetType = Object.freeze({
  CASH: 'Cash',
  CASH_IN_BANK: 'Cash in Bank',
  PETTY_CASH_FUND: 'Petty Cash Fund',
  ACCOUNTS_RECEIVABLE: 'Accounts Receivable',
  ADVANCES: 'Advances',
  INVENTORY : 'Inventory',
  MEMBER_FUND: "Member's Fund",
  FIXED_ASSET: "Fixed Assets",
  ACCUMULATED_DEPRECIATION : "Accumulated Depreciation",
  OTHER_ASSETS : "Other Assets"
})


export {
  AssetType,
  CustomerType,
  TransactionType,
  MerchantType,
  UserType,
  SETTINGS,
  ACCESS_LEVELS,
  PITMASTER_CUSTOMER_STATUS,
  TRANSACTION_FEE_TYPE,
  FlowType,
  TransType,
  Config
}
