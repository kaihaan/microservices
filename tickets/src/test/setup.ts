import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import  request from 'supertest'
import jwt from 'jsonwebtoken'

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[]
        }
    }
}

let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'
    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

global.signin = () => {

    // build JWT payload { id, email }

    const payload = { id: new mongoose.Types.ObjectId().toHexString(), email: 'test@test.com'}

    // create the JWT

    const token = jwt.sign( payload, process.env.JWT_KEY!)

    // build session object {jwt: token }

    const session = {jwt: token}

    // turn session into JSON

    const sessionJSON = JSON.stringify(session)

    // encode as base64

    const base64 = Buffer.from(sessionJSON).toString('base64')

    // build cookie string express:sess=BASE64

    const cookie = [`express:sess=${base64}`]

    return cookie
}