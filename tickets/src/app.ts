import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@wemustmake/common'
import { createTicketRouter, showTicketRouter, getAllTicketRouter, changeTicketRouter } from './routes'

const app = express()
app.set('trust proxy', true) // so express trusts https from the ingress proxy
app.use(express.json())
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }))
app.use(currentUser)


app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(getAllTicketRouter)
app.use(changeTicketRouter)


app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }
