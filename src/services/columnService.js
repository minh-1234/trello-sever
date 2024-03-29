import ApiError from '~/utils/ApiError'
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { result } from 'lodash'
import { cardModel } from '~/models/cardModel'
import { StatusCodes } from 'http-status-codes'
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
const deleteItem = async (columnId) => {
  try {
    // chuyen sang model
    const targetColumn = await columnModel.findoneById(columnId)
    if (!targetColumn) {
      new ApiError(StatusCodes.NOT_FOUND, 'Not found column')
    }
    await columnModel.deleteColumn(columnId)

    await cardModel.deleteManyCards(columnId)

    await boardModel.pullColumnOrderIds(targetColumn)

    return result
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}
export const columnService = {
  createNew,
  update,
  deleteItem
}