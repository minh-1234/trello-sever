import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'

const cardRouter = express.Router()

cardRouter.route('/').post(cardValidation.createNew, cardController.createNew)
cardRouter.route('/:id')
  .put(cardValidation.update, cardController.update)
  .delete(cardValidation.deleteItem, cardController.deleteItem)

module.exports = cardRouter