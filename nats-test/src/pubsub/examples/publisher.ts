import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from '../../pubsub'

console.clear()

const stan = nats.connect('ticketing', 'abc', { url: 'http://localhost:4222' })

stan.on('connect', async () => {
    console.log('Publisher connected to nats')

    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'concert',
    //     price: 20
    // })

    // stan.publish(Subjects.TicketCreated, data, ()=> {
    //     console.log('event published')
    // })

    const data = {
        id: '123',
        title: 'concert',
        price: 20,
        userId: 'abc'
    }

    const publisher = new TicketCreatedPublisher(stan)

    try {
        await publisher.publish(data)

    } catch (err) {
        console.error(err)
    }
})

