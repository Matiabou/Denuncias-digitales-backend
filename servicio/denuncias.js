import Producto from '../modelo/Denuncia.js'
import MongoDB from '../modelo/DAO/denunciasMongoDB.js' 
import config from '../config.js'


class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = MongoDB()
    }

    obtenerDenuncias = async id => {
        if(id) {
            const denuncia = await this.#modelo.obtenerDenuncia(id)
            return denuncia
        }
        else {
            const denuncias = await this.#modelo.obtenerDenuncias()
            return denuncias
        }
    }

    guardarDenuncia = async denuncia => {
        const denuncia = new Denuncia(denuncia)
        denuncia.validar()

        const denunciaGuardada = await this.#modelo.guardarDenuncia(denuncia.get())
        return denunciaGuardada
    }

    actualizarDenuncia = async (id, denuncia) => {
        const denunciaActualizada = await this.#modelo.actualizarDenuncia(id, denuncia)
        return denunciaActualizada
    }

    borrarDenuncia = async id => {
        const denunciaEliminada = await this.#modelo.borrarDenuncia(id)
        return denunciaEliminada
    }
}

export default Servicio