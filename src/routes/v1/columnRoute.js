import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'

const columnRouter = express.Router()

columnRouter.route('/').post(columnValidation.createNew, columnController.createNew)
columnRouter.route('/:id')
  .put(columnValidation.update, columnController.update)

module.exports = columnRouter