import Joi from 'joi'

class Denuncia {

    constructor(usuarioId, descripcion, fecha, ubicacion, estado, hora, tipo, evidencias = []) {
        this.usuarioId = usuarioId
        this.descripcion = descripcion
        this.fecha = fecha || new Date()
        this.ubicacion = ubicacion
        this.estado = estado || 'pendiente'
        this.evidencias = evidencias
        this.hora = hora
        this.tipo = tipo
    }

    validar() {
        const schema = Joi.object({
            usuarioId: Joi.string().required(),
            descripcion: Joi.string().min(10).max(1000).required(),
            ubicacion: Joi.string().required(),
            fecha: Joi.date(),
            estado: Joi.string().valid('pendiente', 'en_revision', 'resuelta', 'rechazada').default('pendiente'),
            hora: Joi.string().required(),
            tipo: Joi.string().required()
        })

        const { error } = schema.validate(this)

        if (error) throw error
    }

    get() {
        return {
            usuarioId: this.usuarioId,
            descripcion: this.descripcion,
            fecha: this.fecha,
            ubicacion: this.ubicacion,
            estado: this.estado,
            hora: this.hora,
            tipo: this.tipo,
            evidencias: this.evidencias
        }
    }

}

export default Denuncia