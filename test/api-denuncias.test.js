import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:3000");

describe("*** TEST API DENUNCIAS ***", () => {
  describe("GET /api/denuncias", () => {
    it("Debería retornar status 200", async () => {
      const response = await request.get("/api/denuncias");

      expect(response.status).to.eql(200);
    });
  });

  describe("POST /api/denuncias", () => {
    it("Debe guardar una denuncia válida", async () => {
      const denuncia = {
        usuarioId: "6a29f7051b5ee754df756e9c",
        descripcion: "Descripción válida para una denuncia",
        ubicacion: "Buenos Aires",
      };

      const response = await request.post("/api/denuncias").send(denuncia);
      console.log("STATUS:", response.status);
      console.log("BODY:", response.body);

      expect(response.status).to.eql(200);
    });

    it("Debe retornar error con una denuncia inválida", async () => {
      const denuncia = {
        usuarioId: "usuario1",
        descripcion: "corta",
        ubicacion: "Buenos Aires",
      };

      const response = await request.post("/api/denuncias").send(denuncia);

      expect(response.status).to.eql(500);
    });

    it("Debe retornar error si la denuncia está vacía", async () => {
      const response = await request.post("/api/denuncias").send({});

      expect(response.status).to.eql(500);
    });
  });
});
