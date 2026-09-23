import type { Request, Response } from "express";
import { prisma } from "./prisma.js";
import { crearSalaSchema, crearReservaSchema, idSchema } from "./validation.js";

// GET /api/salas — trae cada sala con sus reservas
export async function listarSalas(_req: Request, res: Response) {
  const salas = await prisma.sala.findMany({
    include: { reservas: true },
    orderBy: { id: "asc" },
    take: 100,
  });
  res.json(salas);
}

// POST /api/salas — blindado con Zod
export async function crearSala(req: Request, res: Response) {
  // A · Validar entrada
  const parsed = crearSalaSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "datos inválidos",
      detalles: parsed.error.flatten().fieldErrors,
    });
  }

  // B · Guardar datos limpios
  const sala = await prisma.sala.create({ data: parsed.data });

  // C · Responder
  res.status(201).json(sala);
}

// POST /api/salas/:id/reservas — blindado con Zod
export async function crearReserva(req: Request, res: Response) {
  // Validar parámetro :id
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) {
    return res.status(400).json({ error: "id de sala inválido" });
  }

  // A · Validar cuerpo de la reserva
  const parsed = crearReservaSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "datos inválidos",
      detalles: parsed.error.flatten().fieldErrors,
    });
  }

  // Verificar que la sala exista
  const sala = await prisma.sala.findUnique({ where: { id: id.data } });
  if (!sala) {
    return res.status(404).json({ error: "sala no encontrada" });
  }

  // B · Guardar reserva asociada
  const reserva = await prisma.reserva.create({
    data: { ...parsed.data, salaId: id.data },
  });

  // C · Responder
  res.status(201).json(reserva);
}

// DELETE /api/salas/:id — con validación de ID
export async function borrarSala(req: Request, res: Response) {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) {
    return res.status(400).json({ error: "id de sala inválido" });
  }

  try {
    await prisma.sala.delete({ where: { id: id.data } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "sala no encontrada" });
  }
}