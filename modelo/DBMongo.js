import { MongoClient } from "mongodb";
import config from "../config.js";

class CnxMongoDB {
  static db = null;
  static client = null;
  static connectionOK = false;

  static conectar = async () => {
    if (CnxMongoDB.connectionOK && CnxMongoDB.client) {
      return;
    }

    console.log("conectando a la base de datos...");

    CnxMongoDB.client = new MongoClient(config.STRCNX, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
    });

    await CnxMongoDB.client.connect();

    console.log("base de datos CONECTADA");

    CnxMongoDB.db = CnxMongoDB.client.db(config.BASE);
    CnxMongoDB.connectionOK = true;
  };

  static desconectar = async () => {
    if (!CnxMongoDB.connectionOK) return;

    if (CnxMongoDB.client) {
      await CnxMongoDB.client.close();
    }

    CnxMongoDB.db = null;
    CnxMongoDB.client = null;
    CnxMongoDB.connectionOK = false;
  };
}

export default CnxMongoDB;
