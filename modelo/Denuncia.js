import Joi from 'joi'

class Denuncia {

    constructor(Persona, descripcion, fecha, ubicacion, estado){
           this.persona = Persona,
           this.descripcion = descripcion,
           this.fecha = new Date(),
           this.ubicacion = ubicacion,
           this.estado = estado
    }

 validar() {
        const schema = Joi.object({
            descripcion :  Joi.string().alphanum().required(),
            ubicacion:Joi.string().alphanum().required(),
        });

        const { error } = schema.validate({
            descripcion: this.descripcion,
            ubicacion: this.ubicacion,
        });
        if(error) {
            throw new Error(error)
        }
    }        

    get (){
        return{
            descripcion: this.descripcion,
            fecha: this.fecha,
            ubicacion: this.ubicacion,
            estado: this.estado
        }
    }








}