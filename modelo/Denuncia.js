import Joi from 'joi'

class Denuncia {

    constructor(usuarioId, descripcion, fecha, ubicacion, estado) {
        this.usuarioId = usuarioId
        this.descripcion = descripcion
        this.fecha = fecha || new Date()
        this.ubicacion = ubicacion
        this.estado = estado || 'pendiente'
    }

    validar() {
        const schema = Joi.object({
            usuarioId: Joi.string().required(),
            descripcion: Joi.string().min(10).max(1000).required(),
            ubicacion: Joi.string().required(),
            fecha: Joi.date(),
            estado: Joi.string().valid('pendiente', 'en_revision', 'resuelta', 'rechazada').default('pendiente')
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
            estado: this.estado
        }
    }

}

export default Denuncia