import { Subjects } from '../../../pubsub'

interface Event {
    subject: Subjects
    data: any
}

export interface TicketUpdatedEvent extends Event {
    subject: Subjects.TicketUpdated
    data: {
        id: string
        title: string
        price: number
        userId: string
    }
}