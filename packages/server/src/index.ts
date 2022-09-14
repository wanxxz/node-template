import debug from 'debug'

import db from '~/db'
import policy from '~/policy'
import auth from '~/auth'
import server from '~/server'

const log = debug('server:src:index')

async function run() {
  // typeorm
  await db.init()
  // casbin
  await policy.init()
  // passport
  auth.init()
  // koa
  await server.init()
}

process.on('unhandledRejection', err => {
  log(err)
  process.exit(1)
})

run()
