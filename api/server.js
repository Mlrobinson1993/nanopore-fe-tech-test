import express from 'express'
import cors from 'cors'
import accountsJson from './accounts.json' assert { type: 'json' }
import customersJson from './customers.json' assert { type: 'json' }
const app = express()
const port = 3000

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)

app.use(express.json())

let accounts = accountsJson.accounts

let customers = customersJson.customers

//  Endpoint to fetch accounts
app.get('/api/accounts', (req, res) => {
  try {
    return res.json(accounts)
  } catch (e) {
    console.log(e)
    return []
  }
})

//  Endpoint to fetch accounts for user
app.get('/api/accounts/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const activeUser = customers.find((acc) => acc.id === userId)
    const accountsForUser = accounts.filter(
      (acc) => activeUser.account_roles?.some((role) => role.id === acc.id) ?? false
    )

    return accountsForUser?.length ? res.json(accountsForUser) : []
  } catch (e) {
    console.log(e)
    return []
  }
})

//  Endpoint to fetch customers
app.get('/api/customers', (_req, res) => {
  try {
    return res.json(customers)
  } catch (e) {
    console.log(e)
    return []
  }
})

//  Endpoint to fetch customer by id
app.get('/api/customer/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const customer = customers.find((customer) => customer.id === id)
    return customer?.id ? res.json(customer) : res.status(404).json({ error: 'Customer not found' })
  } catch (e) {
    console.log(e)
    return res.status(404).json({ error: 'Customer not found' })
  }
})

//  Endpoint to fetch customers for account
app.get('/api/customers/:accountId', (req, res) => {
  try {
    const accountId = parseInt(req.params.accountId)
    const account = accounts.find((account) => account.id === accountId)
    if (!account) {
      console.error('Account not found')
      return [] // would realistically return a 404 here and handle it on the front end
    }

    const customersForAccount = customers.filter(
      (customer) => customer.account_roles?.some((role) => role.id === accountId) ?? false
    )
    return res.json(customersForAccount)
  } catch (e) {
    console.log(e)
    return []
  }
})

//  Endpoint to create a new Customer
app.post('/api/customer', (req, res) => {
  try {
    const customer = req.body
    const customerIds = customers.map((customer) => customer.id)
    const newCustomerId = Math.max(...customerIds) + 1
    customer.id = newCustomerId
    customers.push(customer)
    return res.status(201).json(customer)
  } catch (e) {
    console.log(e)
    return []
  }
})

app.put('/api/customer/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const updatedCustomer = req.body
    customers = customers.map((customer) => {
      if (customer.id === id) {
        return { ...customer, ...updatedCustomer }
      }
      return customer
    })
    return res.json(customers.find((customer) => customer.id === id))
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Bad request' })
  }
})

//  Endpoint to delete a Customer
app.delete('/api/customer/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    customers = customers.filter((customer) => customer.id !== id)
    return res.status(204).json({ message: 'Customer deleted successfully' })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Bad request' })
  }
})

app.listen(port, () => {
  console.log(` API server running at http://localhost:${port}`)
})
