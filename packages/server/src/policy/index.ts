import debug from 'debug'
import sqlite3 from 'sqlite3'
import { Enforcer, newEnforcer } from 'casbin'
import { BasicAdapter } from 'casbin-basic-adapter'

const log = debug('server:src:policy')

import constants from '~/constants'

let enforcer: Enforcer

async function init() {
  try {
    const db = new sqlite3.Database(constants.TYPEORM_DATABASE)

    const a = await BasicAdapter.newAdapter('sqlite3', db)

    enforcer = await newEnforcer('src/policy/rbac_model.conf', a)

    log('initialized')
  } catch (e) {
    log('init failed', e)
  }
}

function getEnforcer() {
  return enforcer
}

export default { init, getEnforcer }
