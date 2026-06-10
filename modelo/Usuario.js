import Joi from 'joi'

class Usuario {

    constructor(nombre, apellido, email, dni)
    {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.dni = dni
    }

    validar() {

        const schema =
            Joi.object({
                nombre: Joi.string().required(),
                apellido: Joi.string().required(),
                email: Joi.string().email().required(),
                dni: Joi.number().integer().required()
            })

        const { error } = schema.validate(this)

        if (error)
            throw error

    }

    get() {

        return {
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            dni: this.dni
        }
    }
}

export default Usuario