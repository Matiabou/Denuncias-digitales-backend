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

      console.log(response.error);

      expect(response.status).to.eql(200);

      await server.stop();
    });
  });
});
