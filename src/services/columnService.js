import ApiError from '~/utils/ApiError'
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {

  try {
    const createColumn = {
      ...reqBody
    }
    // chuyen sang model
    const columnNew = await columnModel.createNewColumn(createColumn)
    const getColumn = await columnModel.findoneById(columnNew.insertedId)
    if (getColumn) {
      getColumn.cards = []
      await boardModel.pushColumnIds(getColumn)
    }
    console.log(getColumn)
    return getColumn
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}
const update = async (columnId, reqBody) => {
  try {
    // chuyen sang model
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const column = await columnModel.update(columnId, updateData)

    return column
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}
export const columnService = {
  createNew,
  update
}