export type AccountRole = {
  id: number
  role: string
}

export type Account = {
  id: number
  organisation_name: string
  address_line_1: string
  address_line_2: string
  region: string
  country: string
  duns_number: string
  create_date: string
  account_roles: AccountRole[]
}

export type Accounts = { accounts: Account[] }
