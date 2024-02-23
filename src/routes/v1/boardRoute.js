/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const boardRouter = express.Router()

boardRouter.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API from get board status' })
})
boardRouter.route('/').post(boardValidation.createNew, boardController.createNew)

module.exports = boardRouter
