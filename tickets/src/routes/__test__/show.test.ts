import request from 'supertest'
import {app} from '../../app'
import mongoose from 'mongoose'

it('Returns 404 if ticket is not found', async ()=> {
    const id = new mongoose.Types.ObjectId().toHexString()
    
    const res = await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404)
})

it('Returns ticket if ticket is  found', async ()=> {
    
    const title = 'title'
    const price = 20

    const ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(201)

    const foundTicket = await request(app)
        .get(`/api/tickets/${ticket.body.id}`)
        .send()
        .expect(200)
    
    expect(foundTicket.body.title).toEqual(title)
    expect(foundTicket.body.price).toEqual(price)
})