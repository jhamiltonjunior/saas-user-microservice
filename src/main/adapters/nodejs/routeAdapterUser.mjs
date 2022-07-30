import http, { IncomingMessage } from 'node:http'
import { parse } from 'querystring'

// import { IHttpRequest } from '@src/adapters/http/controllers/ports/http'
// import { AuthUserController } from '@src/adapters/http/controllers/users/authUserController'
// import { RegisterUserController } from '@src/adapters/http/controllers/users/registerUserController'
// import { ShowUserController } from '@src/adapters/http/controllers/users/showUserController'

const server = http.createServer(async (request, res) => {
  // set the request route
  if (request.url === '/api' && request.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    // res.write({
    //   message: 'Hi there, This is a Vanilla Node.js API'
    // })

    let body = ''

    request.on('data', (chunck) => {
      body += chunck.toString()
    })

    request.on('end', () => {
      console.log(body)
      res.end(body)
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
}).listen(3000)

export const adpterRoute = (// controller:
  // RegisterUserController |
  // AuthUserController |
  // ShowUserController
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
  return async (request, response) => {
    let body = ''
    const httpRequest = {}

    request.on('data', (chunck) => {
      body += chunck
    })

    request.on('end', () => {
      httpRequest.body = parse(body)
      // httpRequest.params = request.params
    })

    // const httpResponse = await controller.handle(httpRequest)
    // response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})
