import config from "./config.js";
import Server from "./server.js";

const server = new Server(config.PORT, config.MODO_PERSISTENCIA);
await server.start();
