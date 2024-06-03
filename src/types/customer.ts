import type { AccountRole } from './account'

export type Customer = {
  id: number
  first_name: string
  last_name: string
  job_title: string
  email: string
  start_date: string
  account_roles: AccountRole[]
}

export type Customers = { customers: Customer[] }
