import request from 'supertest'
import { app } from '../../app'

it('fails when unknown user is supplied', async () => {

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400)
})

it('fails when incorrect password is supplied', async () => {

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "wrongpassword"
        })
        .expect(400)
})

it('responds with a cookie when correctly signed in', async () => {

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
})