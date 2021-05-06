import mongoose from 'mongoose'

// ### typescript defs
// describes the properties require for a new user
interface TicketAttr {
    title: string
    price: number
    userId: string
}

// properties of User Document
interface TicketDoc extends mongoose.Document {
    title: string
    price: number
    userId: string
}

// user model properties (adds the custom static func)
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttr): TicketDoc
}

// 
const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

ticketSchema.statics.build = (attrs: TicketAttr) => {
    return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('ticket', ticketSchema)

export { Ticket }