import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes'
import { errorHandler, NotFoundError } from '@wemustmake/common'

const app = express()
app.set('trust proxy', true) // so express trusts https from the ingress proxy
app.use(express.json())
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }
