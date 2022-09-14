import dotenv from 'dotenv'

dotenv.config()

const { HOST, PORT, TYPEORM_DATABASE } = process.env

export default { HOST, PORT, TYPEORM_DATABASE }
