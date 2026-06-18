import { expect } from "chai";
import supertest from "supertest";
import Server from "../server.js";

describe("*** TEST API DENUNCIAS ***", () => {
  describe("GET", () => {
    it("Debería retornar un status 200", async () => {
      const server = new Server(3001, "MONGODB");
      const app = await server.start();

      const request = supertest(app);

      const response = await request.get("/api/denuncias");

      expect(response.status).to.eql(200);

      await server.stop();
    });
  });
  describe("POST", () => {
    it("Debería crear una denuncia", async () => {
      const server = new Server(3001, "MONGODB");
      const app = await server.start();

      const request = supertest(app);

      const denuncia = {
        usuarioId: "6a31d128d9c7247b8b536cbd",
        descripcion: "Descripción válida para una denuncia",
        ubicacion: "Buenos Aires",
        hora: "14:30",
        tipo: "Robo",
      };

      const response = await request.post("/api/denuncias").send(denuncia);

      expect(response.status).to.eql(200);

      const denunciaGuardada = response.body;
      expect(denunciaGuardada).to.include.keys(
        "usuarioId",
        "descripcion",
        "ubicacion",
        "hora",
        "tipo",
        "_id",
      );

      expect(denunciaGuardada.usuarioId).to.eql(denuncia.usuarioId);
      expect(denunciaGuardada.descripcion).to.eql(denuncia.descripcion);
      expect(denunciaGuardada.ubicacion).to.eql(denuncia.ubicacion);
      expect(denunciaGuardada.hora).to.eql(denuncia.hora);
      expect(denunciaGuardada.tipo).to.eql(denuncia.tipo);

      await server.stop();
    });
  });
  describe("DELETE /api/denuncias/:id", () => {
    it("Debe eliminar una denuncia existente", async () => {
      const server = new Server(3001, "MONGODB");
      const app = await server.start();

      const request = supertest(app);
      const denuncia = {
        usuarioId: "6a31d128d9c7247b8b536cbd",
        descripcion: "Denuncia para eliminar",
        ubicacion: "Buenos Aires",
        hora: "14:30",
        tipo: "Robo",
      };

      const postRes = await request.post("/api/denuncias").send(denuncia);
      const id = postRes.body._id;
      const deleteRes = await request.delete(`/api/denuncias/${id}`);
      expect(deleteRes.status).to.eql(200);

      await server.stop();
    });
  });
});
