import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  // eslint-disable-next-line node/no-path-concat
  readdirSync((`${__dirname}/../routes`)).map(async (file) => {
    if (!file.includes('.test.' || '.spec.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}

// import { readdirSync } from 'fs';

// import path from 'path';

// export default (app) => {
//   readdirSync(__dirname)

//   // vou procurar por todos os meus arquivos dentro desse diretorio
//   // que não começam com dot (ponto, ".")
//     .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')

//   // agora vou pegar todos os arquivos que sobraram dessa filtragem
//   // e repassar o app nele
//     .forEach((file) => {
//       import(path.resolve(__dirname, file)).then((module) => module.default(app));
//     });
// };
