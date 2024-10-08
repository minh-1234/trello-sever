
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const boardRouter = express.Router()

boardRouter.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API from get board status' })
})
boardRouter.route('/').post(boardValidation.createNew, boardController.createNew)
boardRouter.route('/:id')
  .get(boardController.getDetailBoard)
  .put(boardValidation.update, boardController.update)


boardRouter.route('/support/moving_card').put(boardValidation.moveCardToDifferentColumns, boardController.moveCardToDifferentColumns)

module.exports = boardRouter
