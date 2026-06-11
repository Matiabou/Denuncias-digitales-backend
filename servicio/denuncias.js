import Denuncia from '../modelo/Denuncia.js'
import MongoDB from '../modelo/DAO/denunciasMongoDB.js'
import UsuariosMongoDB from '../modelo/DAO/usuariosMongoDB.js'
import config from '../config.js'



class Servicio {
    #modelo = null
    #usuarios = null

    constructor() {
        this.#modelo = new MongoDB()
        this.#usuarios = new UsuariosMongoDB()
    }

    obtenerDenuncias = async (id, estado) => {
        if (id)
            return await this.#modelo.obtenerDenuncia(id)

        const filtro = {}

        if (estado)
            filtro.estado = estado

        return await this.#modelo.obtenerDenuncias(filtro)
    }

    guardarDenuncia = async datos => {
        const usuario = await this.#usuarios.obtenerUsuario(datos.usuarioId)

        if (!usuario) {
            throw new Error(
                'Usuario inexistente'
            )
        }

        const denuncia = new Denuncia(datos.usuarioId, datos.descripcion, datos.fecha, datos.ubicacion, datos.estado)

        denuncia.validar()

        return await this.#modelo.guardarDenuncia(denuncia.get())
    }

    actualizarDenuncia = async (id, denuncia) => {
        const denunciaActualizada = await this.#modelo.actualizarDenuncia(id, denuncia)
        return denunciaActualizada
    }

    borrarDenuncia = async id => {
        const denunciaEliminada = await this.#modelo.borrarDenuncia(id)
        return denunciaEliminada
    }

    obtenerPorUsuario = async id => {
        return await this.#modelo.obtenerPorUsuario(id)
    }
}

export default Servicio