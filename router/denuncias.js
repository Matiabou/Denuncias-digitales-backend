import express from "express";
import upload from "../middlewares/upload.js";
import Controlador from "../controlador/denuncias.js";


class Router {
  #controlador = null;

  constructor(persistencia) {
    this.#controlador = new Controlador(persistencia);
  }

  config() {
    const router = express.Router();

    router.get("{/:id}", this.#controlador.obtenerDenuncias);
    router.post("/", this.#controlador.guardarDenuncia);
    router.put("/:id", this.#controlador.actualizarDenuncia);
    router.delete("/:id", this.#controlador.borrarDenuncia);
    router.get("/usuario/:id", this.#controlador.obtenerPorUsuario);
    router.get("/tipo/:tipo", this.#controlador.obtenerPorTipo);
    router.post("/:id/evidencia", upload.single('archivo'), this.#controlador.subirEvidencia);
    router.get("/:id/pdf", this.#controlador.exportarPDF);

    return router;
  }
}

export default Router;
