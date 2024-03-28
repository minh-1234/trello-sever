const { MongoClient, ServerApiVersion } = require('mongodb')
import { env } from '~/config/environment'

const URI = env.MONGODB_URI
let trelloMongoDB = null
const mongoClientInstance = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
}
)

export const Connect_DB = async () => {
  await mongoClientInstance.connect()

  trelloMongoDB = await mongoClientInstance.db(env.DATABASE_NAME)
  console.log('Connected Database')
}

export const Get_DB = () => {
  if (!trelloMongoDB) {
    throw new Error('Must connect database first')
  }
  return trelloMongoDB
}

export const Close_DB = async () => {
  await mongoClientInstance.close()
}
