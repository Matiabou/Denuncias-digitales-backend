import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:3000");

describe("*** TEST API USUARIOS ***", () => {
  describe("GET /api/usuarios", () => {
    it("Debería retornar status 200", async () => {
      const response = await request.get("/api/usuarios");

      expect(response.status).to.eql(200);
    });

    it("Debe retornar un array", async () => {
      const response = await request.get("/api/usuarios");

      expect(response.body).to.be.an("array");
    });
  });

  describe("POST /api/usuarios", () => {
    it("Debe guardar un usuario válido", async () => {
      const usuario = {
        nombre: "Juan",
        apellido: "Perez",
        email: "juan@test.com",
        dni: 12345678,
        telefono: "1122334455",
        domicilio: "Calle Falsa 123",
        sexo: "Masculino",
        contrasenia: "123456",
      };

      const response = await request.post("/api/usuarios").send(usuario);

      expect(response.status).to.eql(200);
    });

    it("Debe retornar error con email inválido", async () => {
      const usuario = {
        nombre: "Juan",
        apellido: "Perez",
        email: "email-invalido",
        dni: 12345678,
        telefono: "1122334455",
        domicilio: "Calle Falsa 123",
        sexo: "Masculino",
        contrasenia: "123456",
      };

      const response = await request.post("/api/usuarios").send(usuario);

      expect(response.status).to.eql(500);
    });
  });
});
