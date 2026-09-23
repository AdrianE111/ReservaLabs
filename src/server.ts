import express from "express";
import cors from "cors";
import {
  listarSalas,
  crearSala,
  crearReserva,
  borrarSala,
} from "./salas.controller.js";
import { env } from "./env.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/salas", listarSalas);
app.post("/api/salas", crearSala);
app.post("/api/salas/:id/reservas", crearReserva);
app.delete("/api/salas/:id", borrarSala);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`API lista en http://localhost:${PORT}`);
});