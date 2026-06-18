import CnxMongoDB from "../DBMongo.js";
import { ObjectId } from "mongodb";

class UsuariosMongoDB {
  constructor() {}

  async obtenerUsuarios() {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    return await CnxMongoDB.db.collection("usuarios").find().toArray();
  }

  async obtenerUsuario(id) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    return await CnxMongoDB.db.collection("usuarios").findOne({
      _id: new ObjectId(id),
    });
  }

  async guardarUsuario(usuario) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    const r = await CnxMongoDB.db.collection("usuarios").insertOne(usuario);

    return {
      ...usuario,
      _id: r.insertedId,
    };
  }

  async actualizarUsuario(id, usuario) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    await CnxMongoDB.db.collection("usuarios").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: usuario,
      },
    );

    return usuario;
  }

  async borrarUsuario(id) {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    return await CnxMongoDB.db.collection("usuarios").deleteOne({
      _id: new ObjectId(id),
    });
  }
}

export default UsuariosMongoDB;
