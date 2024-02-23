import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    const createNewBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createNewBoard)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}