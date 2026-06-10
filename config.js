import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT || 3000,
    MODO_PERSISTENCIA: process.env.MODO_PERSISTENCIA || 'MONGODB',
    STRCNX: process.env.MONGODB_URI,
    BASE: process.env.BASE || 'denuncias'
}