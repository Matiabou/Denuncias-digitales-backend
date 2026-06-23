import Joi from "joi";

class Denuncia {
  constructor(
    usuarioId,
    descripcion,
    fecha,
    ubicacion,
    estado,
    hora,
    tipo,
    evidencias = [],
    titulo = "",
  ) {
    this.usuarioId = usuarioId;
    this.descripcion = descripcion;
    this.fecha = fecha || new Date();
    this.ubicacion = ubicacion;
    this.estado = estado || "pendiente";
    this.evidencias = evidencias;
    this.hora = hora;
    this.tipo = tipo;
    this.titulo = titulo;
  }

  validar() {
    const schema = Joi.object({
      usuarioId: Joi.string().required(),
      descripcion: Joi.string().min(10).max(1000).required(),
      ubicacion: Joi.string().required(),
      fecha: Joi.date(),
      estado: Joi.string()
        .valid("pendiente", "en_revision", "resuelta", "rechazada")
        .default("pendiente"),
      hora: Joi.string().required(),
      tipo: Joi.string().required(),
      evidencias: Joi.array().default([]),
      titulo: Joi.string().allow("").max(200),
    });

    const { error } = schema.validate(this);

    if (error) throw error;
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
      evidencias: this.evidencias,
      titulo: this.titulo,
    };
  }
}

export default Denuncia;
