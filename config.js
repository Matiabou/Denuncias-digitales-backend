
const PORT = 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || ''
const STRCNX = process.env.STRCNX || ''
const BASE = process.env.BASE || 'test'

export default {
    PORT,   
    MODO_PERSISTENCIA,
    STRCNX,
    BASE
}