import debug from 'debug'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import passport from 'koa-passport'
import route from 'koa-route'

import constants from '~/constants'
import handlers from '~/handlers'

const log = debug('server:src:server')

async function init() {
  const app = new Koa()

  app.keys = ['secret']

  app.use(bodyParser())

  app.use(session({}, app))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(route.post('/login', handlers.login))

  app.listen(constants.PORT)
}

export default { init }
