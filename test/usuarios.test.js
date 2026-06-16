import { expect } from "chai";
import Usuario from "../modelo/Usuario.js";

describe("*** TEST USUARIO ***", () => {
  it("Debe contener los campos requeridos", () => {
    const usuario = new Usuario(
      "Juan",
      "Perez",
      "juan@test.com",
      12345678,
      "1122334455",
      "Calle Falsa 123",
      "Masculino",
      "123456",
    );

    const datos = usuario.get();

    expect(datos).to.include.keys(
      "nombre",
      "apellido",
      "email",
      "dni",
      "telefono",
      "domicilio",
      "sexo",
      "contrasenia",
    );
  });

  it("No debe lanzar error con un usuario válido", () => {
    const usuario = new Usuario(
      "Juan",
      "Perez",
      "juan@test.com",
      12345678,
      "1122334455",
      "Calle Falsa 123",
      "Masculino",
      "123456",
    );

    expect(() => usuario.validar()).to.not.throw();
  });

  it("Debe lanzar error con email inválido", () => {
    const usuario = new Usuario(
      "Juan",
      "Perez",
      "email-invalido",
      12345678,
      "1122334455",
      "Calle Falsa 123",
      "Masculino",
      "123456",
    );

    expect(() => usuario.validar()).to.throw();
  });

  it("Debe lanzar error si falta el nombre", () => {
    const usuario = new Usuario("", "Perez", "juan@test.com", 12345678);

    expect(() => usuario.validar()).to.throw();
  });
});
