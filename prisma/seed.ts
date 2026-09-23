import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const salones = [
    {
      nombre: 'Lab A · Redes',
      edificio: 'M',
      capacidad: 30,
      imagenUrl: '/images/redes.png',
    },
    {
      nombre: 'Lab B · Software',
      edificio: 'M',
      capacidad: 25,
      imagenUrl: '/images/programacion.png',
    },
    {
      nombre: 'Lab C · Hardware',
      edificio: 'O',
      capacidad: 20,
      imagenUrl: '/images/electronica.png',
    },
    {
      nombre: 'Lab D · Inteligencia Artificial',
      edificio: 'T',
      capacidad: 35,
      imagenUrl: '/images/ia.png',
    },
    {
      nombre: 'Lab E · Ciberseguridad',
      edificio: 'T',
      capacidad: 25,
      imagenUrl: '/images/ciberseguridad.png',
    },
    {
      nombre: 'Lab F · Multimedia y Diseño',
      edificio: 'O',
      capacidad: 40,
      imagenUrl: '/images/multimedia.png',
    },
  ];

  for (const salon of salones) {
    const existe = await prisma.sala.findFirst({
      where: { nombre: salon.nombre },
    });

    if (existe) {
      // Si la sala ya existe, actualiza su imagenUrl
      await prisma.sala.update({
        where: { id: existe.id },
        data: { imagenUrl: salon.imagenUrl },
      });
    } else {
      // Si la sala es nueva, la crea con todos sus campos
      await prisma.sala.create({
        data: salon,
      });
    }
  }

  console.log('seed listo con imagenes dinamicas asociadas');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });