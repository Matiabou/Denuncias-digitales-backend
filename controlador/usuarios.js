import Servicio from '../servicio/usuarios.js'


class Controlador {
    #servicio = null

    constructor() {
        this.#servicio = new Servicio()
    }

    obtenerUsuarios = async (req, res) => {
        try {
            const { id } = req.params
            const usuarios = await this.#servicio.obtenerUsuarios(id)
            res.json(usuarios)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    guardarUsuario = async (req, res) => {
        try {
            const usuario = req.body

            if (Object.keys(usuario).length == 0) throw new Error('El usuario esta vacío')
            const usuarioGuardado = await this.#servicio.guardarUsuario(usuario)
            res.json(usuarioGuardado)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    loginUsuario = async (req, res) => {
        try {
            const usuario = req.body

            if (Object.keys(usuario).length == 0) throw new Error('El usuario esta vacío')
            const usuarioLogueado = await this.#servicio.loginUsuario(usuario)
            res.json(usuarioLogueado)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    actualizarUsuario = async (req, res) => {
        try {
            const { id } = req.params
            const usuario = req.body
            const usuarioActualizado = await this.#servicio.actualizarUsuario(id, usuario)
            res.json(usuarioActualizado)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    borrarUsuario = async (req, res) => {
        try {
            const { id } = req.params
            const usuarioEliminado = await this.#servicio.borrarUsuario(id)
            res.json(usuarioEliminado)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

}

export default Controlador