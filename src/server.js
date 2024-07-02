import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import { env } from '~/config/environment'
import { Connect_DB, Close_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import Router from '~/routes/v1/index'
import { errorHandlingMiddleware } from '~/middlewares/errorMiddleware'

const start = async () => {
  try {
    await Connect_DB()
    const app = express()
    app.use(cors(corsOptions))
    app.use(express.json())
    app.use('/v1', Router)
    app.use(errorHandlingMiddleware)
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`Hello, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
    })
    exitHook(() => {
      console.log('exit app')
      Close_DB()
    })
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
start()