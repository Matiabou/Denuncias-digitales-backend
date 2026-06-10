import Denuncia from '../modelo/Denuncia.js'
import MongoDB from '../modelo/DAO/denunciasMongoDB.js'
import config from '../config.js'


class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = new MongoDB()
    }

    obtenerDenuncias = async id => {
        if (id) {
            const denuncia = await this.#modelo.obtenerDenuncia(id)
            return denuncia
        }
        else {
            const denuncias = await this.#modelo.obtenerDenuncias()
            return denuncias
        }
    }

    guardarDenuncia = async datos => {
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