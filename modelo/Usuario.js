import Joi from 'joi'

class Usuario {

    constructor(nombre, apellido, email, dni, telefono, domicilio, sexo, contrasenia)
    {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.dni = dni
        this.telefono = telefono
        this.domicilio = domicilio
        this.sexo = sexo
        this.contrasenia = contrasenia
    }

    validar() {

        const schema =
            Joi.object({
                nombre: Joi.string().required(),
                apellido: Joi.string().required(),
                email: Joi.string().email().required(),
                dni: Joi.number().integer().required(),
                telefono: Joi.string().required(),
                domicilio: Joi.string().required(),
                sexo: Joi.string().required(),
                contrasenia: Joi.string().required()
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
            dni: this.dni,
            telefono: this.telefono,
            domicilio: this.domicilio,
            sexo: this.sexo,
            contrasenia: this.contrasenia
        }
    }
}

export default Usuario