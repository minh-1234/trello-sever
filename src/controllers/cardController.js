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
const update = async (req, res, next) => {
  try {
    const cardId = req.params.id
    const column = await cardService.update(cardId, req.body)
    res.status(StatusCodes.OK).json(column)
  } catch (error) {
    next(error)
  }
}
const deleteItem = async (req, res, next) => {
  try {
    const cardId = req.params.id
    const card = await cardService.deleteItem(cardId)
    res.status(StatusCodes.OK).json(card)
  } catch (error) {
    next(error)
  }
}
export const cardController = {
  createNew,
  update,
  deleteItem
}