import express from 'express'
import RouterDenuncias from './router/denuncias.js'
import RouterUsuarios from './router/usuarios.js'


class Server {
    #port = null
    #routerDenuncias = null
    #routerUsuarios = null

    constructor(port) {
        this.#port = port
        this.#routerDenuncias = new RouterDenuncias().config()
        this.#routerUsuarios = new RouterUsuarios().config()
    }

    start() {
        const app = express()
        
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))

        //Servicio de recursos estáticos (recursos de Frontend)
        app.use(express.static('public'))
        app.use('/api/denuncias', this.#routerDenuncias)
        app.use('/api/usuarios', this.#routerUsuarios)

        const port = this.#port
        const server = app.listen(port, () => console.log(`Servidor ApiRestful escuchando en http://localhost:${port}`))
        server.on('error', error => console.log(`Error en servidor ${error.message}`))
    }
}

export default Server