import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { ApiError } from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const dataCorrection = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
  })
  try {
    await dataCorrection.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}
const update = async (req, res, next) => {
  const dataCorrection = Joi.object({
    // boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    // columnId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).trim().strict(),
    cover: Joi.string().min(3).max(2000).trim().strict()
  })
  try {
    await dataCorrection.validateAsync(req.body,
      {
        abortEarly: false,
        allowUnknown: true
      })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

const deleteItem = async (req, res, next) => {
  const dataCorrection = Joi.object({
    id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await dataCorrection.validateAsync(req.params)
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}
export const cardValidation = {
  createNew,
  update,
  deleteItem
}