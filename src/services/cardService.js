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
export const cardService = {
  createNew
}