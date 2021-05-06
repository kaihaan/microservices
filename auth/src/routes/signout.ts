import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res)=> {
    // empty session to clear cookie with JWT
    req.session = null
    res.send({})
})

export default router