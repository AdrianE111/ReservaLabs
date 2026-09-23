import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL es obligatoria"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL es obligatoria"),
  PORT: z.coerce.number().int().positive().default(3010),
});

export const env = envSchema.parse(process.env);