import { config as dotenvConfig } from 'dotenv'

import app from './config/app'

dotenvConfig()

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 5000}`)
})

// captura erros não tratados
// se não tiver ele o sistema quebra
process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})
