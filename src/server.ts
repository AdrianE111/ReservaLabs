import express from "express";
import cors from "cors";
import { env } from "./env.js";
import {
  listarSalas,
  crearSala,
  crearReserva,
  borrarSala,
} from "./salas.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.get("/api/salas", listarSalas);
app.post("/api/salas", crearSala);
app.post("/api/salas/:id/reservas", crearReserva);
app.delete("/api/salas/:id", borrarSala);

// Se utiliza env.PORT validado previamente por Zod
app.listen(env.PORT, () => {
  console.log(`API lista en http://localhost:${env.PORT}`);
});