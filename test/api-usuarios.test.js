import { expect } from "chai";
import supertest from "supertest";
import Server from "../server.js";

describe("*** TEST API USUARIOS ***", () => {
  describe("GET", () => {
    it("Debería retornar status 200", async () => {
      const server = new Server(3001, "MONGODB");
      const app = await server.start();

      const request = supertest(app);
      const response = await request.get("/api/usuarios");

      expect(response.status).to.eql(200);

      await server.stop();
    });

    it("Debe retornar un array", async () => {
      const server = new Server(3001, "MONGODB");
      const app = await server.start();

      const request = supertest(app);
      const response = await request.get("/api/usuarios");

      expect(response.status).to.eql(200);
      expect(response.body).to.be.an("array");

      await server.stop();
    });
  });

  describe("POST", () => {
    it("Debe guardar un usuario válido", async () => {
      const server = new Server(3001, "MONGODB");
      const app = await server.start();

      const request = supertest(app);

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
      const usuarioGuardado = response.body;

      expect(usuarioGuardado).to.include.keys(
        "nombre",
        "apellido",
        "email",
        "dni",
        "telefono",
        "domicilio",
        "sexo",
        "_id",
      );

      expect(usuarioGuardado.nombre).to.eql(usuario.nombre);
      expect(usuarioGuardado.apellido).to.eql(usuario.apellido);
      expect(usuarioGuardado.email).to.eql(usuario.email);
      expect(usuarioGuardado.dni).to.eql(usuario.dni);
      expect(usuarioGuardado.telefono).to.eql(usuario.telefono);
      expect(usuarioGuardado.domicilio).to.eql(usuario.domicilio);
      expect(usuarioGuardado.sexo).to.eql(usuario.sexo);

      await server.stop();
    });

    it("Debe retornar error con email inválido", async () => {
      const server = new Server(3001, "MONGODB");
      const app = await server.start();

      const request = supertest(app);

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

      await server.stop();
    });
  });
  describe("DELETE", () => {
    it("Debe eliminar un usuario existente", async () => {
      const server = new Server(3001, "MONGODB");
      const app = await server.start();

      const request = supertest(app);

      const usuario = {
        nombre: "Juan",
        apellido: "Perez",
        email: "juan_delete@test.com",
        dni: 12345678,
        telefono: "1122334455",
        domicilio: "Calle Falsa 123",
        sexo: "Masculino",
        contrasenia: "123456",
      };
      const postRes = await request.post("/api/usuarios").send(usuario);

      const id = postRes.body._id;
      const deleteRes = await request.delete(`/api/usuarios/${id}`);

      expect(deleteRes.status).to.eql(200);

      await server.stop();
    });
  });
});
