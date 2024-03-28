import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'

const cardRouter = express.Router()

cardRouter.route('/').post(cardValidation.createNew, cardController.createNew)

module.exports = cardRouter