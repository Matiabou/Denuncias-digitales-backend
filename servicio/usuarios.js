import Usuario from '../modelo/Usuario.js'
import UsuariosMongoDB from '../modelo/DAO/usuariosMongoDB.js'
import DenunciasMongoDB from '../modelo/DAO/denunciasMongoDB.js'

class Servicio {
    #modelo = null
    #denuncias = null

    constructor() {
        this.#modelo = new UsuariosMongoDB()
        this.#denuncias = new DenunciasMongoDB()
    }

    obtenerUsuarios = async id => {
        if (id)
            return await this.#modelo.obtenerUsuario(id)

        return await this.#modelo.obtenerUsuarios()
    }

    guardarUsuario = async datos => {
        const contrasenia = datos.contrasenia ?? datos.contraseña ?? datos.contrasena
        const usuario = new Usuario(
            datos.nombre,
            datos.apellido,
            datos.email,
            datos.dni,
            datos.telefono,
            datos.domicilio,
            datos.sexo,
            contrasenia
        )

        usuario.validar()

        return await this.#modelo.guardarUsuario(usuario.get())

    }

    loginUsuario = async datos => {
        const contrasenia = datos.contrasenia ?? datos.contraseña ?? datos.contrasena
        const usuarios = await this.#modelo.obtenerUsuarios()
        const usuario = usuarios.find(usuario => String(usuario.dni) === String(datos.dni))

        if (!usuario || usuario.contrasenia !== contrasenia)
            throw new Error('DNI o contraseña incorrectos')

        return usuario
    }

    actualizarUsuario = async (id, usuario) => await this.#modelo.actualizarUsuario(id, usuario)

    borrarUsuario = async id => {
        const denuncias = await this.#denuncias.obtenerPorUsuario(id)

        if (denuncias.length > 0)
            throw new Error('No se puede borrar un usuario con denuncias')

        return await this.#modelo.borrarUsuario(id)
    }

}

export default Servicio