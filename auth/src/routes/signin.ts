import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { validateRequest,  BadRequestError } from '@wemustmake/common'
import { Password } from '../lib/password'

const router = express.Router()

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        throw new BadRequestError('Login failed')
    }

    // compare passwords
    const passwordsMatch = await Password.compare(existingUser.password, password)
    if(!passwordsMatch) {
        throw new BadRequestError('Login failed')
    }

    // return JWT in cookie
    const userJwt = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_KEY!)

    req.session = { jwt: userJwt }  // ts doesn't want us to assume session.jwt exists

    res.status(200).send(existingUser)
})

export default router