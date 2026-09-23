import type { Request, Response } from "express";
import { prisma } from "./prisma.js";
import { idSchema, crearSalaSchema, crearReservaSchema } from "./validation.js";

// GET /api/salas
export async function listarSalas(_req: Request, res: Response) {
  try {
    const salas = await prisma.sala.findMany({
      include: { reservas: true },
      orderBy: { id: "asc" },
      take: 100,
    });

    res.json(salas);
  } catch (error) {
    console.error("Error al listar salas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// POST /api/salas
export async function crearSala(req: Request, res: Response) {
  try {
    const parsed = crearSalaSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "datos inválidos",
        detalles: parsed.error.flatten().fieldErrors,
      });
    }

    const { nombre, edificio, capacidad } = parsed.data;

    const sala = await prisma.sala.create({
      data: { nombre, edificio, capacidad },
    });

    res.status(201).json(sala);
  } catch (error) {
    console.error("Error al crear sala:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// POST /api/salas/:id/reservas
export async function crearReserva(req: Request, res: Response) {
  try {
    const idParsed = idSchema.safeParse(req.params.id);
    if (!idParsed.success) {
      return res.status(400).json({ error: "id de sala inválido" });
    }

    const parsed = crearReservaSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "datos inválidos",
        detalles: parsed.error.flatten().fieldErrors,
      });
    }

    const salaId = idParsed.data;

    const sala = await prisma.sala.findUnique({
      where: { id: salaId },
    });

    if (!sala) {
      return res.status(404).json({ error: "la sala no existe" });
    }

    // Validación de cruce de horarios (Conflicto 409)
    const conflicto = await prisma.reserva.findFirst({
      where: {
        salaId,
        inicio: { lt: parsed.data.fin },
        fin: { gt: parsed.data.inicio },
      },
    });

    if (conflicto) {
      return res.status(409).json({
        error: "El horario seleccionado ya está reservado",
      });
    }

    const { responsable, motivo, inicio, fin } = parsed.data;

    const reserva = await prisma.reserva.create({
      data: {
        responsable,
        motivo,
        inicio,
        fin,
        salaId,
      },
    });

    res.status(201).json(reserva);
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// DELETE /api/salas/:id
export async function borrarSala(req: Request, res: Response) {
  try {
    const idParsed = idSchema.safeParse(req.params.id);
    if (!idParsed.success) {
      return res.status(400).json({ error: "id de sala inválido" });
    }

    const id = idParsed.data;

    await prisma.sala.delete({ where: { id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "sala no encontrada" });
  }
}