import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    const createNewcard = await cardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createNewcard)
  } catch (error) {
    next(error)
  }
}
export const cardController = {
  createNew
}