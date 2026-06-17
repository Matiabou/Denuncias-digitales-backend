import { MongoClient } from "mongodb";
import config from "../config.js";

class CnxMongoDB {
  static db = null;
  static connectionOk = false;

  static conectar = async () => {
    try {
      console.log("conectando a la base de datos...");
      const client = new MongoClient(config.STRCNX, {
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
      });
      await client.connect();
      console.log("base de datos CONECTADA");

      CnxMongoDB.db = client.db(config.BASE);
      CnxMongoDB.connectionOk = true;
    } catch (error) {
      console.log(`Error en conexion a base de datos:`);
      console.log(error);
    }
  };
}

export default CnxMongoDB;
