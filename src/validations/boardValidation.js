import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const dataCorrection = Joi.object({
    title: Joi.string().required().min(3).max(256).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
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

export const boardValidation = {
  createNew
}