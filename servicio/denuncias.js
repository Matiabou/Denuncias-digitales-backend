import Denuncia from "../modelo/Denuncia.js";
import MongoDB from "../modelo/DAO/denunciasMongoDB.js";
import UsuariosMongoDB from "../modelo/DAO/usuariosMongoDB.js";
import PDFDocument from "pdfkit";
import config from "../config.js";

class Servicio {
  #modelo = null;
  #usuarios = null;

  constructor() {
    this.#modelo = new MongoDB();
    this.#usuarios = new UsuariosMongoDB();
  }

  obtenerDenuncias = async (id, estado) => {
    console.log("ENTRO A OBTENER DENUNCIAS");
    let denuncias;

    if (id) {
      denuncias = await this.#modelo.obtenerDenuncia(id);
    } else {
      const filtro = {};

      if (estado) filtro.estado = estado;

      denuncias = await this.#modelo.obtenerDenuncias(filtro);
    }

    if (!denuncias) return null;

    const normalizarEvidencia = (e) => {
      let rutaRelativa = e.ruta || "";
      if (rutaRelativa && (rutaRelativa.includes("\\") || rutaRelativa.includes("/"))) {
        const normalizada = rutaRelativa.replace(/\\/g, "/");
        const indexUploads = normalizada.indexOf("uploads/");
        if (indexUploads !== -1) {
          rutaRelativa = normalizada.substring(indexUploads);
        }
      }
      const backendUrl = process.env.BACKEND_URL || `http://localhost:${config.PORT || 3000}`;
      return {
        ...e,
        ruta: rutaRelativa,
        url: `${backendUrl}/${rutaRelativa}`,
      };
    };

    if (!Array.isArray(denuncias)) {
      console.log("ENTRO A DENUNCIA INDIVIDUAL");
      const usuario = await this.#usuarios.obtenerUsuario(denuncias.usuarioId);

      console.log("USUARIO:", usuario);

      return {
        ...denuncias,

        usuario: usuario
          ? {
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              dni: usuario.dni,
            }
          : null,

        evidencias: denuncias.evidencias?.map(normalizarEvidencia),
      };
    }

    return denuncias.map((d) => ({
      ...d,
      evidencias: d.evidencias?.map(normalizarEvidencia),
    }));
  };

  guardarDenuncia = async (datos) => {
    const usuario = await this.#usuarios.obtenerUsuario(datos.usuarioId);

    if (!usuario) {
      throw new Error("Usuario inexistente");
    }

    const denuncia = new Denuncia(
      datos.usuarioId,
      datos.descripcion,
      datos.fecha,
      datos.ubicacion,
      datos.estado,
      datos.hora,
      datos.tipo,
      datos.evidencias || [],
      datos.titulo || "",
    );

    denuncia.validar();

    return await this.#modelo.guardarDenuncia(denuncia.get());
  };

  actualizarDenuncia = async (id, denuncia) => {
    const { evidencias, ...datosAActualizar } = denuncia;
    await this.#modelo.actualizarDenuncia(id, datosAActualizar);
    return await this.obtenerDenuncias(id);
  };

  borrarDenuncia = async (id) => {
    const denunciaEliminada = await this.#modelo.borrarDenuncia(id);
    return denunciaEliminada;
  };

  obtenerPorUsuario = async (id) => {
    return await this.#modelo.obtenerPorUsuario(id);
  };

  obtenerPorTipo = async (tipo) => {
    return await this.#modelo.obtenerPorTipo(tipo);
  };

  subirEvidencia = async (id, rutaArchivo) => {
    const denuncia = await this.#modelo.obtenerDenuncia(id);

    if (!denuncia) {
      throw new Error("Denuncia inexistente");
    }

    return await this.#modelo.subirEvidencia(id, rutaArchivo);
  };

  generarPDF = async (id) => {
    const denuncia = await this.#modelo.obtenerDenuncia(id);

    if (!denuncia) throw new Error("Denuncia inexistente");

    const usuario = await this.#usuarios.obtenerUsuario(denuncia.usuarioId);

    const doc = new PDFDocument();

    doc.fontSize(20);
    doc.text("DENUNCIA DIGITAL");

    doc.moveDown();

    doc.fontSize(12);

    doc.text(`ID: ${denuncia._id}`);
    doc.text(`Título: ${denuncia.titulo || "Sin título"}`);
    doc.text(`Fecha: ${denuncia.fecha}`);
    doc.text(`Estado: ${denuncia.estado}`);

    doc.moveDown();

    doc.text(
      `Denunciante: ${usuario.nombre} ${usuario.apellido} - DNI: ${usuario.dni} - Sexo: ${usuario.sexo}`,
    );

    doc.text(`Domicilio: ${usuario.domicilio}`);
    doc.text(`Teléfono: ${usuario.telefono}`);

    doc.moveDown();

    doc.text("Descripción:");
    doc.text(denuncia.descripcion);

    return doc;
  };
}

export default Servicio;
