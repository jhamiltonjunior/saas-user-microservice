import http, { IncomingMessage } from 'node:http'

// import { IHttpRequest } from '@src/adapters/http/controllers/ports/http'
// import { AuthUserController } from '@src/adapters/http/controllers/users/authUserController'
// import { RegisterUserController } from '@src/adapters/http/controllers/users/registerUserController'
// import { ShowUserController } from '@src/adapters/http/controllers/users/showUserController'

http.createServer(async (request, response) => {
  // set the request route
  if (request.url === '/api' && request.method === 'POST') {
    let body = ''

    request.on('data', (chunck) => {
      body += chunck
    })
    // GET Endpoint
    // console.log('Request Type:' +
    //       request.method + ' Endpoint: ' +
    //       reqUrl.pathname)

    // service.sampleRequest(req, res)

    request.on('end', () => {
      const content = JSON.parse(body)

      console.log(content.name)
      response.end(body)
    })

    response.writeHead(200, { 'Content-Type': 'application/json' })
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'Route not found' }))
  }
}).listen(3000)

export const adapterRoute = (
  // controller:
  // RegisterUserController |
  // AuthUserController |
  // ShowUserController
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
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

    // const httpResponse = await controller.handle(httpRequest)
    // response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})
