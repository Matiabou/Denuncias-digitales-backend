import express from 'express'

import Controlador from '../controlador/denuncias.js'

class Router {
    #controlador = null

    constructor() {
        this.#controlador = new Controlador()
    }

    config() {
        const router = express.Router()

        router.get('{/:id}', this.#controlador.obtenerDenuncia)
        router.post('/', this.#controlador.guardarDenuncia)
        router.put('/:id', this.#controlador.actualizarDenuncia)
        router.delete('/:id', this.#controlador.borrarDenuncia)

        return router
    }
}

export default Router