/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import boardRouter from './boardRoute'


const Router = express.Router()

Router.route('/status').get((req, res) => {
  res.status(StatusCodes.OK).end('<h1>Hello World!</h1><hr>')
})
Router.use('/board', boardRouter)

module.exports = Router