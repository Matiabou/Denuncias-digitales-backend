import Denuncia from '../modelo/Denuncia.js'
import MongoDB from '../modelo/DAO/denunciasMongoDB.js'
import UsuariosMongoDB from '../modelo/DAO/usuariosMongoDB.js'
import PDFDocument from 'pdfkit'
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

    obtenerPorTipo = async tipo => {
        return await this.#modelo.obtenerPorTipo(tipo)
    }

    subirEvidencia = async (id, rutaArchivo) => {
        const denuncia = await this.#modelo.obtenerDenuncia(id)
        
        if (!denuncia) {
            throw new Error('Denuncia inexistente')
        }
        
        return await this.#modelo.subirEvidencia(id, rutaArchivo)
    }

    generarPDF = async id => {

    const denuncia = await this.#modelo.obtenerDenuncia(id)

    if (!denuncia)
        throw new Error('Denuncia inexistente')

    const usuario = await this.#usuarios.obtenerUsuario(
        denuncia.usuarioId
    )

    const doc = new PDFDocument()

    doc.fontSize(20)
    doc.text('DENUNCIA DIGITAL')

    doc.moveDown()

    doc.fontSize(12)

    doc.text(`ID: ${denuncia._id}`)
    doc.text(`Fecha: ${denuncia.fecha}`)
    doc.text(`Estado: ${denuncia.estado}`)

    doc.moveDown()

    doc.text(
        `Denunciante: ${usuario.nombre} ${usuario.apellido} - DNI: ${usuario.dni} - Sexo: ${usuario.sexo}`)

    doc.text(`Domicilio: ${usuario.domicilio}`)
    doc.text(`Teléfono: ${usuario.telefono}`)

    doc.moveDown()

    doc.text('Descripción:')
    doc.text(denuncia.descripcion)

    return doc
}
}

export default Servicio