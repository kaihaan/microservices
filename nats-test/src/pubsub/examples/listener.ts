import nats from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import { TicketCreatedListener } from '../events/ticket-created/ticket-created-listener'

console.clear()
const conectionName = randomBytes(4).toString('hex')

const stan = nats.connect('ticketing', conectionName, { url: 'http://localhost:4222' })

stan.on('connect', () => {
    console.log('Listener connected to nats')

    stan.on('close', () => {
        console.log('NATS connection closed')
        process.exit()
    })

    new TicketCreatedListener(stan).listen()
})

process.on('SIGINT', () => { stan.close() })
process.on('SIGTERM', () => { stan.close() })


