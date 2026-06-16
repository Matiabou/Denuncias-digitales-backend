import { expect } from "chai";
import Denuncia from "../modelo/Denuncia.js";

describe("*** TEST DENUNCIA ***", () => {
  it("Debe contener los campos requeridos", () => {
    const denuncia = new Denuncia(
      "usuario1",
      "Descripción válida para una denuncia",
      new Date(),
      "Buenos Aires",
    );

    const datos = denuncia.get();

    expect(datos).to.include.keys(
      "usuarioId",
      "descripcion",
      "fecha",
      "ubicacion",
      "estado",
    );
  });

  it("Debe asignar estado pendiente por defecto", () => {
    const denuncia = new Denuncia(
      "usuario1",
      "Descripción válida para una denuncia",
      new Date(),
      "Buenos Aires",
    );

    expect(denuncia.get().estado).to.eql("pendiente");
  });

  it("Debe lanzar error con descripción demasiado corta", () => {
    const denuncia = new Denuncia(
      "usuario1",
      "corta",
      new Date(),
      "Buenos Aires",
    );

    expect(() => denuncia.validar()).to.throw();
  });
  it("Debe asignar una fecha por defecto", () => {
    const denuncia = new Denuncia(
      "usuario1",
      "Descripción válida para una denuncia",
      undefined,
      "Buenos Aires",
    );

    expect(denuncia.get().fecha).to.exist;
  });
});
