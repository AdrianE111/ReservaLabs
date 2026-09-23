import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const salones = [
    { nombre: 'Lab A · Redes', edificio: 'M', capacidad: 30 },
    { nombre: 'Lab B · Software', edificio: 'M', capacidad: 25 },
    { nombre: 'Lab C · Hardware', edificio: 'O', capacidad: 20 },
    { nombre: 'Lab D · Inteligencia Artificial', edificio: 'T', capacidad: 35 },
    { nombre: 'Lab E · Ciberseguridad', edificio: 'T', capacidad: 25 },
    { nombre: 'Lab F · Multimedia y Diseño', edificio: 'O', capacidad: 40 },
  ];

  for (const salon of salones) {
    // Usamos findFirst / create para no duplicar si ya existen los primeros 3
    const existe = await prisma.sala.findFirst({
      where: { nombre: salon.nombre },
    });

    if (!existe) {
      await prisma.sala.create({
        data: salon,
      });
    }
  }

  console.log('seed listo con salones adicionales');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });