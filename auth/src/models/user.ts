import mongoose from 'mongoose'
import { Password } from '../lib/password'

// ### typescript defs
// describes the properties require for a new user
interface UserAttr {
    email: string
    password: string
}

// user model properties (adds the custom static func)
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc
}

// properties of User Document
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}


// ### Schema

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

// mongoose middleware
// 'this' refers to the user document
// cant use arrow func as this would be for the wrong object 
userSchema.pre('save', async function(done) {
    if(this.isModified('password')){  // only if password changed (not if only email changed for example)
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

// workaround so that ts can check params
userSchema.statics.build = (attrs: UserAttr) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)


export { User }