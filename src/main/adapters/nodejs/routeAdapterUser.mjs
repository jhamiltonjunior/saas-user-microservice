/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */

import http, { IncomingMessage } from 'node:http'
import url from 'node:url'

// import { IHttpRequest } from '@src/adapters/http/controllers/ports/http'
// import { AuthUserController } from '@src/adapters/http/controllers/users/authUserController'
// import { RegisterUserController } from '@src/adapters/http/controllers/users/registerUserController'
// import { ShowUserController } from '@src/adapters/http/controllers/users/showUserController'

http.createServer(async (request, response) => {
  // set the request route
  if (request.url === '/api/:id' && request.method === 'POST') {
    let body = ''
    const cunrrentUrl = new URL(request.url)
    const reqUrl = url.parse(request.url, true)

    request.on('data', (chunck) => {
      body += chunck
    })



    // GET Endpoint
    console.log('Request Type:' +
          request.method + ' Endpoint: ' +
          reqUrl.pathname)





          
          
    request.on('end', () => {
      const content = JSON.parse(body)

      console.log(content.name)
      response.end(body)
    })

    response.writeHead(200, { 'Content-Type': 'application/json' })
  } 
  // else {
  //   response.writeHead(404, { 'Content-Type': 'application/json' })
  //   response.end(JSON.stringify({ message: 'Route not found' }))
  // }
}).listen(3000)

export const adapterRoute = (
  controller
  // RegisterUserController |
  // AuthUserController |
  // ShowUserController
) => {
  return async (request, response) => {
    let body
    const httpRequest = {}

    request.on('data', (chunck) => {
      body += chunck
    })

    request.on('end', () => {
      const contentBody = JSON.parse(body)
      httpRequest.body = contentBody
      // httpRequest.params = request.params
    })

    const httpResponse = await controller.handle(httpRequest)

    response.writeHead(httpResponse.statusCode, { 'Content-Type': 'application/json' })
    response.end(httpResponse.body)
  }
}

process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})
