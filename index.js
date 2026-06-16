import config from "./config.js";
import Server from "./server.js";
import CnxMongoDB from "./modelo/DBMongo.js";

await CnxMongoDB.conectar();

const server = new Server(config.PORT, config.MODO_PERSISTENCIA);
server.start();
