import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
})

it('returns non-401 if the user signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})

    // console.log(response.status)
    expect(response.status).not.toEqual(401)
})

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title: '', price: 10 })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ price: 10 })
        .expect(400)
})

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title: 'title', price: -10 })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title: 'title' })
        .expect(400)
})

it('creates a ticket with valid inputs', async () => {
    // add check for new ticket in DB
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    const title = 'title'
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price: 10 })
        .expect(201)

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(10)
    expect(tickets[0].title).toEqual(title)

})