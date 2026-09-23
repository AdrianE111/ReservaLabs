import "dotenv/config";
import { z } from "zod";
const envSchema = z.object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL es obligatoria"),
    DIRECT_URL: z.string().min(1, "DIRECT_URL es obligatoria"),
    PORT: z.coerce.number().int().positive().default(3010),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("✕ Configuración inválida. Revisa tu .env:");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}
export const env = parsed.data;
//# sourceMappingURL=env.js.map