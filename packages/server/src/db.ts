import 'reflect-metadata'
import { DataSource, ConnectionOptionsReader } from 'typeorm'
import debug from 'debug'

const log = debug('server:src:db')

export async function init() {
  try {
    const cor = new ConnectionOptionsReader()
    const opt = await cor.all()
    const ds = new DataSource(opt[0])

    ds.initialize()

    log('initialized')
  } catch (e) {
    log(e)
  }
}

export default { init }
