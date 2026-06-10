import express from 'express'

import Controlador from '../controlador/usuarios.js'

class Router {
    #controlador = null

    constructor() {
        this.#controlador = new Controlador()
    }

    config() {
        const router = express.Router()

        router.get('{/:id}', this.#controlador.obtenerUsuarios)
        router.post('/', this.#controlador.guardarUsuario)
        router.put('/:id', this.#controlador.actualizarUsuario)
        router.delete('/:id', this.#controlador.borrarUsuario)

        return router
    }
}

export default Router