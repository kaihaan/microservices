import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { BadRequestError, validateRequest } from '@wemustmake/common'
import { User } from '../models/user'

const router = express.Router()

const signupHandler = async (req: Request, res: Response) => {

    //  console.log('Trying to create a  user...')
    // check if user already exists
    const  { email, password } = req.body
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new BadRequestError('User already exists')
    }

    // hash the password
    // achieved by a 'pre' save middleware on mongoose in the model/schema
    
    // create user obj/model & save
    const user = User.build({ email, password })
    await user.save()

    // send cookie / jwt

    const userJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY!)

    req.session = { jwt: userJwt }  // ts doesn't want us to assume session.jwt exists

    res.status(201).send(user)

}



router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20}).withMessage('Password must be between 4 and 20 chars')], 
    validateRequest,
    signupHandler
)

export default router