import 'module-alias/register'
import env from './config/env'
import { MongoHelper } from '@/infra/db'

MongoHelper.connect(env.mongoURL)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port} - hire me!`))
  })
  .catch(console.error)
