import express from "express";

import Controlador from "../controlador/usuarios.js";

class Router {
  #controlador = null;

  constructor(persistencia) {
    this.#controlador = new Controlador(persistencia);
  }

  config() {
    const router = express.Router();

    router.get("{/:id}", this.#controlador.obtenerUsuarios);
    router.post("/", this.#controlador.guardarUsuario);
    router.post("/login", this.#controlador.loginUsuario);
    router.put("/:id", this.#controlador.actualizarUsuario);
    router.delete("/:id", this.#controlador.borrarUsuario);

    return router;
  }
}

export default Router;
