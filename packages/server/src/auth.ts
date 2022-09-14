import debug from 'debug'
import bcrypt from 'bcrypt'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from '~/entities'

const log = debug('server:src:auth')

function init() {
  passport.serializeUser(function (user: Partial<User>, done) {
    done(null, user.id)
  })

  passport.deserializeUser(async function (id: User['id'], done) {
    try {
      const user = await User.findOneBy({ id })
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  passport.use(
    new LocalStrategy(async function (name, password, done) {
      try {
        const user = await User.findOneBy({ name })
        const _password = await bcrypt.hash(password, 10)
        if (user && user.password === _password) done(null, user)
        else done(null, false)
      } catch (e) {
        done(e)
      }
    })
  )
}

export default { init }
