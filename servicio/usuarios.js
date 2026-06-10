import Usuario from '../modelo/Usuario.js'
import UsuariosMongoDB from '../modelo/DAO/usuariosMongoDB.js'

class Servicio {

    #modelo = null

    constructor() {
        this.#modelo = new UsuariosMongoDB()
    }

    obtenerUsuarios = async id => {
        if (id)
            return await this.#modelo.obtenerUsuario(id)

        return await this.#modelo.obtenerUsuarios()
    }

    guardarUsuario = async datos => {
        const usuario = new Usuario(datos.nombre, datos.apellido, datos.email, datos.dni)

        usuario.validar()

        return await this.#modelo.guardarUsuario(usuario.get())

    }

    actualizarUsuario = async (id, usuario) => await this.#modelo.actualizarUsuario(id,usuario)

    borrarUsuario = async id => await this.#modelo.borrarUsuario(id)

}

export default Servicio