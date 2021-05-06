import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'


it('404 if invalid id', async () => {

    // cases: missing from query, malformed or not in DB 

    let id
    const title = 'abc'
    const price = 20

    // not in DB
    id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(404)


})

it('401 if user not authenticated', async () => {

    let id
    const title = 'abc'
    const price = 20

    // not in DB
    id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({ title, price })
        .expect(401)
})


it('401 if user doesnt own the ticket', async () => {
    let title = 'abc'
    let price = 20

    // create one - as different user!!
    const ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(201)

    // edit from mdifferent user
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(401)

    // verify that update has NOT happened!!

})


it('400 if invalid title or price', async () => {

    let title = 'abc'
    let price = 20

    const cookie = global.signin()

    // create one
    const ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({ title, price })
        .expect(201)

    // title malformed

    title = ''
    price = 20

    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', cookie)
        .send({ title, price })
        .expect(400)


    // title missing
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', cookie)
        .send({ price })
        .expect(400)

    // invalid price
    title = 'abc'
    price = -20
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', cookie)
        .send({ title, price })
        .expect(400)
})


it('200 and updates the ticket if all valid', async () => {

    let title = 'abc'
    let price = 20

    const cookie = global.signin()

    // create one
    const ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({ title, price })
        .expect(201)

    // console.dir(ticket.body)
    // change it
    title = 'def'
    price = 30
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', cookie)
        .send({ title, price })
        .expect(200)

    const changedTicket = await request(app)
        .get(`/api/tickets/${ticket.body.id}`)
        .send()
        
    expect(changedTicket.body.title).toEqual(title)
    expect(changedTicket.body.price).toEqual(price)
})