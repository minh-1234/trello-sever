import { ApiError } from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'


const createNew = async (reqBody) => {
  const createBoard = {
    ...reqBody,
    slug: slugify(reqBody.title)
  }
  try {
    return createBoard
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}

export const boardService = {
  createNew
}