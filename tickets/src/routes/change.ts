import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'
import { body } from 'express-validator'
import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@wemustmake/common'
import { isCallLikeExpression } from 'typescript'


const router = express.Router()

router.put('/api/tickets/:id', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be float, greater than 0')
], validateRequest, async (req: Request, res: Response) => {
    const id = req.params.id
    const { title, price } = req.body

    const ticket = await Ticket.findById(id)

    // console.log(ticket)

    if (!ticket) {
        throw new NotFoundError()
    }

    if (req.currentUser!.id != ticket.userId) {
        throw new NotAuthorizedError()
    }

    ticket.set({ title, price })

    await ticket.save()

    res.send(ticket)

})

export default router