/* eslint-disable no-undef */

import fetch, { Response } from 'node-fetch'

import { config as dotenvConfig } from 'dotenv'

jest.mock('node-fetch')

dotenvConfig()

const HOSTNAME = `${process.env.HOST}:${process.env.PORT}`

console.log(HOSTNAME)

describe('External Postgres Repository', () => {
  test('should be true case the email exists', async () => {
    const response = await fetch(HOSTNAME, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(response)

    // await useCases.registerUserOnDatabase({ name: 'Hamilton', email, password: '123456' })

    // const newInvalidUser = await user.deleteUser(id)

    expect(true).toBe(true)
  })
})
