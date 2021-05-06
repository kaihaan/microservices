import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'
import { NotFoundError} from '@wemustmake/common'

const router = express.Router()

router.get('/api/tickets/:id', async (req:Request, res: Response) => {
    const queryId = req.params.id

    const ticket = await Ticket.findById(queryId)

    // console.log(ticket)

    if(!ticket) {
        throw new NotFoundError()
    } else {
        res.send(ticket)
    }
}) 

export default router