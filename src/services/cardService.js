import ApiError from '~/utils/ApiError'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {

  try {
    const createCard = {
      ...reqBody
    }
    // chuyen sang model
    const cardNew = await cardModel.createNewCard(createCard)
    const getCard = await cardModel.findoneById(cardNew.insertedId)
    if (getCard) {
      await columnModel.pushCardIds(getCard)
    }
    console.log(getCard)
    return getCard
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}
const update = async (cardId, reqBody) => {
  try {
    // chuyen sang model
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const card = await cardModel.update(cardId, updateData)

    return card
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}
const deleteItem = async (cardId) => {
  try {
    // chuyen sang model
    const targetCard = await cardModel.findoneById(cardId)
    if (!targetCard) {
      console.error('khong yim thay card can xoa')
      return
    }
    await cardModel.deleteOneCard(cardId)
    await columnModel.pullCardOrderIds(targetCard)
    return { Result: 'Xoa thanh cong' }
  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
}

export const cardService = {
  createNew,
  update,
  deleteItem
}