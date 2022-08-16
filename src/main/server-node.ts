import { config as dotenvConfig } from 'dotenv'

import app from './config/app'

dotenvConfig()

// captura erros não tratados
// se não tiver ele o sistema pode quebra
process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})
