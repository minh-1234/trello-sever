import { ApiError } from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'

const createNew = async (reqBody) => {

  try {
    const createBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // chuyen sang model
    const BoardNew = await boardModel.createNewBoard(createBoard)
    const getBoard = await boardModel.findoneById(BoardNew.insertedId)
    console.log(getBoard)
    return getBoard
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}
const getDetailBoard = async (boardId) => {
  try {
    // chuyen sang model
    const Board = await boardModel.getDetailBoard(boardId)
    if (!Board) throw new ApiError(404, 'Not Found Board')
    const resBoard = cloneDeep(Board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}
const update = async (boardId, reqBody) => {
  try {
    // chuyen sang model
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const Board = await boardModel.update(boardId, updateData)

    return Board
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}
const moveCardToDifferentColumns = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // chuyen sang model

    await columnModel.update(reqBody.prevColumnId, { cardOrderIds: reqBody.prevCardOrderIds })

    await columnModel.update(reqBody.nextColumnId, { cardOrderIds: reqBody.nextCardOrderIds })

    await cardModel.update(reqBody.currentCardId, {
      columnId: new ObjectId(reqBody.nextColumnId)
    })
    return { updateResult: 'successfully' }
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetailBoard,
  update,
  moveCardToDifferentColumns
}