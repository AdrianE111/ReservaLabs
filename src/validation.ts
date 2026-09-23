import { z } from "zod";

export const idSchema = z.coerce.number().int().positive("id de sala inválido");

export const crearSalaSchema = z.object({
  nombre: z.string().trim().min(2, "el nombre debe tener al menos 2 caracteres").max(80),
  edificio: z.string().trim().min(1, "el edificio es obligatorio").max(60),
  capacidad: z.number().int().positive("la capacidad debe ser mayor a 0").max(500, "la capacidad no puede superar 500"),
});

export const crearReservaSchema = z.object({
  responsable: z.string().trim().min(3, "el responsable debe tener al menos 3 caracteres"),
  motivo: z.string().trim().min(3, "el motivo debe tener al menos 3 caracteres"),
  inicio: z.coerce.date(),
  fin: z.coerce.date(),
})
.refine((data) => data.fin > data.inicio, {
  message: "el fin debe ser después del inicio",
  path: ["fin"],
})
.refine((data) => data.inicio > new Date(), {
  message: "no podés reservar en el pasado",
  path: ["inicio"],
});