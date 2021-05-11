import { Subjects, Publisher, TicketCreatedEvent } from '../../../pubsub'


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated
    
}