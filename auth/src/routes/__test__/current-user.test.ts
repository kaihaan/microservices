import request from 'supertest'
import { app } from '../../app'

// expect curent user to come back
it('returns current user deets', async () => {

    const cookie = await global.signin()

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    // console.log(response.body)
    expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('responds with null if not authenticated', async () => {

    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)

    // console.log(response.body)
    expect(response.body.currentUser).toBeNull()
})