/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { env } from '~/config/environment'
import { Connect_DB, Close_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
const app = express()

const start = async () => {
  try {
    await Connect_DB()
    app.get('/', (req, res) => {
      // Test Absolute import mapOrder
      res.end('<h1>Hello World!</h1><hr>')
    })

    app.listen(env.APP_PORT, env.APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`Hello Trung Quan Dev, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
    })
    exitHook(() => {
      console.log('exit app')
      Close_DB()
      console.log('close sucessfully')
    })
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
start()