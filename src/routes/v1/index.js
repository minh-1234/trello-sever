
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import boardRouter from './boardRoute'
import columnRouter from './columnRoute'
import cardRouter from './cardRoute'

const Router = express.Router()

Router.route('/status').get((req, res) => {
  res.status(StatusCodes.OK).end('<h1>Hello World!</h1><hr>')
})
Router.use('/board', boardRouter)
Router.use('/column', columnRouter)
Router.use('/card', cardRouter)
module.exports = Router