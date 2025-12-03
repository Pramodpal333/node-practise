import { z } from "zod";

export const tokenValidationSchema = z.object({
  id: z.string(),
});
