import { z } from "zod";
export declare const idSchema: z.ZodCoercedNumber<unknown>;
export declare const crearSalaSchema: z.ZodObject<{
    nombre: z.ZodString;
    edificio: z.ZodString;
    capacidad: z.ZodNumber;
}, z.core.$strip>;
export declare const crearReservaSchema: z.ZodObject<{
    responsable: z.ZodString;
    motivo: z.ZodString;
    inicio: z.ZodCoercedDate<unknown>;
    fin: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map