import express from "express";
import cors from "cors";
import CnxMongoDB from "./modelo/DBMongo.js";
import RouterDenuncias from "./router/denuncias.js";
import RouterUsuarios from "./router/usuarios.js";
import path from "path";

class Server {
  #port = null;
  #routerDenuncias = null;
  #routerUsuarios = null;
  #persistencia = "";
  #server = null;

  constructor(port, persistencia) {
    this.#port = port;
    this.#routerDenuncias = new RouterDenuncias(persistencia).config();
    this.#routerUsuarios = new RouterUsuarios(persistencia).config();
    this.#persistencia = persistencia;
  }

  async start() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Servicio de recursos estáticos (recursos de Frontend)
    app.use(express.static("public"));
    app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
    app.use(cors({origin:"http://localhost:5173"}));
    app.use("/api/denuncias", this.#routerDenuncias);
    app.use("/api/usuarios", this.#routerUsuarios);

    try {
      if (this.#persistencia == "MONGODB") {
        await CnxMongoDB.conectar();
      }

      const port = this.#port;
      this.#server = app.listen(port, () =>
        console.log(
          `Servidor ApiRestful escuchando en http://localhost:${port}`,
        ),
      );
      this.#server.on("error", (error) =>
        console.log(`Error en servidor ${error.message}`),
      );
    } catch (error) {
      console.log(`Error en conexión de base de datos: ${error.message}`);
    }
    return app;
  }
  async stop() {
    if (this.#server) {
      this.#server.close();
      await CnxMongoDB.desconectar();
      this.#server = null;
    }
  }
}

export default Server;
