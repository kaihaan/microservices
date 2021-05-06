import express, {Request, Response} from 'express'
import {Ticket} from '../models/ticket'

/**
 * returns array of all tickets
 */

const router = express.Router()

router.get('/api/tickets', async (req: Request, res: Response) => {
    const allTickets = await Ticket.find({})
    res.send(allTickets)
})

export default router