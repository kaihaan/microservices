import { Message } from 'node-nats-streaming'
import { Subjects, Listener, TicketCreatedEvent } from '../../../pubsub'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated
    queueGroupName = 'payments-service'

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data! ', data)

        msg.ack()
    }
}