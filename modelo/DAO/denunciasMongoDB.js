import CnxMongoDB from "../DBMongo.js";
import { ObjectId } from "mongodb";

class DenunciaMongoDB {
  constructor() {}
async obtenerDenuncias(filtro = {}) {

  if (!CnxMongoDB.connectionOK)
    throw new Error("Error de conexión a base de datos");

  return await CnxMongoDB.db
    .collection("denuncias")
    .find(filtro)
    .toArray();
}


async obtenerDenuncia(id) {

  if (!CnxMongoDB.connectionOK)
    throw new Error("Error de conexión a base de datos");

  return await CnxMongoDB.db
    .collection("denuncias")
    .findOne({
      _id: new ObjectId(id)
    });
}

  async guardarDenuncia(denuncia) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    const resultado = await CnxMongoDB.db
      .collection("denuncias")
      .insertOne(denuncia);

    return {
      ...denuncia,
      _id: resultado.insertedId,
    };
  }

  async actualizarDenuncia(id, denuncia) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    await CnxMongoDB.db
      .collection("denuncias")
      .updateOne({ _id: new ObjectId(id) }, { $set: denuncia });

    return denuncia;
  }

  async borrarDenuncia(id) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    return await CnxMongoDB.db.collection("denuncias").deleteOne({
      _id: new ObjectId(id),
    });
  }

  async obtenerPorUsuario(usuarioId) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    return await CnxMongoDB.db
      .collection("denuncias")
      .find({ usuarioId })
      .toArray();
  }

  async obtenerPorTipo(tipo) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    return await CnxMongoDB.db.collection("denuncias").find({ tipo }).toArray();
  }

  async subirEvidencia(id, rutaArchivo) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    return await CnxMongoDB.db.collection("denuncias").updateOne(
      { _id: new ObjectId(id) },
      { $push: { evidencias: {ruta: rutaArchivo,fecha: new Date(), },},
      },
    );
  }
}

export default DenunciaMongoDB;
