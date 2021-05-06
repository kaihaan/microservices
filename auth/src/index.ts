
import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {

    if(!process.env.JWT_KEY) { throw new Error('JWT_KEY must be defined')}
    if(!process.env.MONGO_URI) { throw new Error('MONGO_URI must be defined')}

    try {
        console.log('Connecting to MongoDB')
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(3000, () => {
            console.log('Auth listening on port 3000')
        })

    } catch (err) {
        console.log('MongoDB connection failed')
        console.error(err)
    }

}

start()
