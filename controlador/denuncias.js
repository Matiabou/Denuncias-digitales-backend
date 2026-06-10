import Servicio from '../servicio/denuncias.js'


class Controlador {
    #servicio = null

    constructor() {
        this.#servicio = new Servicio()
    }

    obtenerDenuncias = async (req, res) => {
        try {
            const { id } = req.params
            const denuncias = await this.#servicio.obtenerDenuncias(id)
            res.json(denuncias)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    guardarDenuncia = async (req, res) => {
        try {
            const denuncia = req.body

            if (Object.keys(denuncia).length == 0) throw new Error('La denuncia está vacía')
            const denunciaGuardada = await this.#servicio.guardarDenuncia(denuncia)
            res.json(denunciaGuardada)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    actualizarDenuncia = async (req, res) => {
        try {
            const { id } = req.params
            const denuncia = req.body
            const denunciaActualizada = await this.#servicio.actualizarDenuncia(id, denuncia)
            res.json(denunciaActualizada)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    borrarDenuncia = async (req, res) => {
        try {
            const { id } = req.params
            const denunciaEliminada = await this.#servicio.borrarDenuncia(id)
            res.json(denunciaEliminada)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    obtenerPorUsuario = async (req, res) => {
        try {
            const { id } = req.params
            const denuncias = await this.#servicio.obtenerPorUsuario(id)
            res.json(denuncias)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}

export default Controlador