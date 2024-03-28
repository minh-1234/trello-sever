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
const getDetailBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetailBoard(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.update(boardId, req.body)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

const moveCardToDifferentColumns = async (req, res, next) => {
  try {
    const board = await boardService.moveCardToDifferentColumns(req.body)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetailBoard,
  update,
  moveCardToDifferentColumns
}