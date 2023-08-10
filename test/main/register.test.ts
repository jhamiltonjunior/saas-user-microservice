/* eslint-disable no-undef */

import { config as dotenvConfig } from 'dotenv'
import request from 'supertest'
import app from '../../src/main/config/app'
import { randomUUID } from 'crypto'

// globalThis.fetch = fetch

dotenvConfig()

// const HOSTNAME = `${process.env.HOST}:${process.env.PORT}`

const user = {
  name: 'Jose Hamilton',
  email: randomUUID() + '@gmail.com',
  password: '123456',
  mobilePhone: '75981849068',
  cpfCnpj: '07494423010',
  notificationDisabled: false
}

// "jest": "^27.5.1"

describe('External Server', () => {
  it('test api /api/user/test', async () => {
    const response = await request(app).get('/api/user/test')

    expect(response.statusCode).toEqual(200)
    expect(typeof response.body).toEqual('object')
  })

  it('test /api/user/register - post', async () => {
    // user.email = randomUUID() + '@gmail.com

    const response = await request(app)
      .post('/api/user/register')
      .send(user)

    user.password = ''

    // console.log(response.statusCode)
    // console.log(response.body)

    expect(typeof response.body.token).toEqual('string')
    expect(response.body.token).toBeDefined()
    expect(response.body.token).toBeTruthy()

    delete response.body.token

    expect(response.body).toEqual(user)
    expect(response.statusCode).toEqual(201)
  })

  it('test /api/user/auth - post', async () => {
    user.password = '123456'
    const response = await request(app)
      .post('/api/user/auth')
      .send(user)

    expect(typeof response.body.token).toEqual('string')
    expect(response.body.token).toBeDefined()
    expect(response.body.token).toBeTruthy()

    delete response.body.token

    const authUser = {
      email: user.email,
      password: user.password
    }

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(authUser)
  })

  it('test /api/user/:id - get user', async () => {
    const response = await request(app)
      .get('/api/user/0e03f6f0-8794-4426-ace4-6d8fbb2abf88')

    const body = response.body.body

    if (response.statusCode === 400) {
      expect(body).toEqual('User ID not exists!')

      return
    }

    expect(response.statusCode).toEqual(200)
    expect(typeof body).toEqual('object')
    expect(typeof body.name).toEqual('string')
    expect(typeof body.email).toEqual('string')
  })

  it('test /api/user/:id - delete', async () => {
    const response = await request(app)
      .delete('/api/user/863a3a92-4e97-4a5e-aac7-2eb30bdb45e0')

    if (response.statusCode === 400) {
      expect(response.body).toEqual('User ID not exists!')

      return
    }

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ value: 'User Deleted' })
  })
})
