import passport from 'koa-passport'

export const login = passport.authenticate('local', {
  successRedirect: '/200',
  failureRedirect: '/400',
})
