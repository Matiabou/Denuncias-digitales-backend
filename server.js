import express from 'express'
import RouterDenuncias from './router/denuncias.js'


class Server {
    #port = null
    #routerDenuncias = null

    constructor(port) {
        this.#port = port
        this.#routerDenuncias = new RouterDroductos().config()
    }

    start() {
        const app = express()
        
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))

        //Servicio de recursos estáticos (recursos de Frontend)
        app.use(express.static('public'))
        app.use('/api/denuncias', this.#routerDenuncias)

        const port = this.#port
        const server = app.listen(port, () => console.log(`Servidor ApiRestful escuchando en http://localhost:${port}`))
        server.on('error', error => console.log(`Error en servidor ${error.message}`))
    }
}

export default Server