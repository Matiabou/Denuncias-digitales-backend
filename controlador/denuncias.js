import Servicio from "../servicio/denuncias.js";

class Controlador {
  #servicio = null;

  constructor(persistencia) {
    this.#servicio = new Servicio(persistencia);
  }

  obtenerDenuncias = async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.query;
      const denuncias = await this.#servicio.obtenerDenuncias(id, estado);

      res.json(denuncias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  guardarDenuncia = async (req, res) => {
    try {
      const denuncia = req.body;

      if (Object.keys(denuncia).length == 0)
        throw new Error("La denuncia está vacía");
      const denunciaGuardada = await this.#servicio.guardarDenuncia(denuncia);
      res.json(denunciaGuardada);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  actualizarDenuncia = async (req, res) => {
    try {
      const { id } = req.params;
      const denuncia = req.body;
      const denunciaActualizada = await this.#servicio.actualizarDenuncia(
        id,
        denuncia,
      );
      res.json(denunciaActualizada);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  borrarDenuncia = async (req, res) => {
    try {
      const { id } = req.params;
      const denunciaEliminada = await this.#servicio.borrarDenuncia(id);
      res.json(denunciaEliminada);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  obtenerPorUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const denuncias = await this.#servicio.obtenerPorUsuario(id);
      res.json(denuncias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerPorTipo = async (req, res) => {
    try {
      const { tipo } = req.params;
      const denuncias = await this.#servicio.obtenerPorTipo(tipo);
      res.json(denuncias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  subirEvidencia = async (req, res) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        throw new Error('No se ha subido ningún archivo');
      }

      const rutaArchivo = req.file.path;
      const resultado = await this.#servicio.subirEvidencia(id, rutaArchivo);
      
      res.json({
        mensaje: 'Evidencia subida correctamente',
        archivo: req.file.filename,
        ruta: rutaArchivo
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exportarPDF = async (req, res) => {
    try {
      const { id } = req.params;

      const pdf = await this.#servicio.generarPDF(id);

      res.setHeader("Content-Type", "application/pdf");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=denuncia-${id}.pdf`,
      );

      pdf.pipe(res);
      pdf.end();
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
}

export default Controlador;
