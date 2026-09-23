import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const storageUrl = process.env.SUPABASE_STORAGE_URL;
    if (!storageUrl) {
        throw new Error('Falta configurar SUPABASE_STORAGE_URL en el archivo .env');
    }
    const salones = [
        {
            nombre: 'Lab A · Redes',
            edificio: 'M',
            capacidad: 30,
            imagenUrl: `${storageUrl}/redes.png`,
        },
        {
            nombre: 'Lab B · Software',
            edificio: 'M',
            capacidad: 25,
            imagenUrl: `${storageUrl}/programacion.png`,
        },
        {
            nombre: 'Lab C · Hardware',
            edificio: 'O',
            capacidad: 20,
            imagenUrl: `${storageUrl}/electronica.png`,
        },
        {
            nombre: 'Lab D · Inteligencia Artificial',
            edificio: 'T',
            capacidad: 35,
            imagenUrl: `${storageUrl}/ia.png`,
        },
        {
            nombre: 'Lab E · Ciberseguridad',
            edificio: 'T',
            capacidad: 25,
            imagenUrl: `${storageUrl}/ciberseguridad.png`,
        },
        {
            nombre: 'Lab F · Multimedia y Diseño',
            edificio: 'O',
            capacidad: 40,
            imagenUrl: `${storageUrl}/multimedia.png`,
        },
    ];
    for (const salon of salones) {
        const existe = await prisma.sala.findFirst({
            where: { nombre: salon.nombre },
        });
        if (existe) {
            await prisma.sala.update({
                where: { id: existe.id },
                data: {
                    edificio: salon.edificio,
                    capacidad: salon.capacidad,
                    imagenUrl: salon.imagenUrl,
                },
            });
        }
        else {
            await prisma.sala.create({
                data: salon,
            });
        }
    }
    console.log('seed listo con imagenes desde Supabase Storage');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map